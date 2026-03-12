---
title: "Bug修改记录，一个goroutine居然能这么折腾"
date: "2026-03-12"
tags: ["ipsec", "golang", "debugging", "strongswan"]
summary: "记录一次主备IPsec链路下由goroutine超时引发的连锁问题排查，以及显示数量异常与重复协商问题的定位和修复过程。"
---

# Bug修改记录，一个goroutine居然能这么折腾

开年第一个测试居然就这么折腾，虽然解决后回看感觉并不是很复杂的问题，但它确实折腾了我好几天，虽然早就定位到是这个函数，但是怎么也没想到这居然是一个"超时问题"，这也给了我些日志打印和调试上的教训。

先来看看这个bug是怎么产生的。两台FW采用点到点隧道，两条隧道，主备关系，各100条相同的感兴趣流，走不同的出口，全部和对端协商成功。主备链路所有SA保持协商成功，构造主链路DPD超时（还是通过禁用路由），路由全部切到备链路后，观察备链路的路由优先级都为2。恢复路由，让主链路去协商，等待部分IPsec SA协商起来时，再次禁用主链路的路由，发现有大量的ipsec sa重协商，禁用2分钟后去禁用备链路。禁用后，查看路由，发现部分路由指向备链路，优先级为1，过了12分钟，残留的路由被删除。

首先要说说主备链路是什么，首先这是个ipsec链路上的bug，主备ipsec链路是我实现的一个功能，主备链路有相同的感兴趣流但路由优先级不同，目的是等到主链路因为某种原因失效后备链路可以立即生效代替主链路。除此之外就是这个goroutine了，这个goroutine是专门用来实时检测一些sa状态的函数，其中会进入一个专门的检测sa lost的函数，在函数里会通过swan sas和swan conn的区别来判断哪些sa是建立、哪些是失效的，失效的会尝试initiate，而建立好的sa如果检测到没有对应的路由会给其补上。

然后就是解决bug了。首先复现的路程就非常坎坷，我先是没按照bug单里所说的那样配100个感兴趣流，而是只配了20（因为感觉是主备的问题而不是感兴趣流的数量问题），所以出来的结果是一会能复现，一会又不能复现，再加上我觉得bug单所说的条件过于苛刻，所以有些打退堂鼓。在尝试多次后，我终于还是加上了80个感兴趣流，复现差不多能百分百成功了。

成功后，我打开日志发现确实如测试所说，莫名其妙地补了很多路由，但是此时去 `swanctl --list-sas` 查看，发现备链路的sa都已经消失了，证明sa状态是正常的，虽然中途开关主链路时备链路会有很多sa是重协商的状态。其实现在回想起来我应该调试看看函数里的sa存的是什么，或者加上日志再确认确认，但是我没有这么做，而是继续复现，看看能不能再看出什么。（而且当时也在犹豫到底要不要加这个补偿路由优先级，因为按理来说就不应该补偿路由，其实是没太分清楚解决问题主次。）

在先写好根据优先级补偿路由的功能后，我终于开始加日志调试了。我先是在salost函数打断点，但是怎么都没有break，我想这可能是dlv自己的问题。我也漏过了日志中每次在salost内的循环打印中间都会间隔好几秒（它是一次打好几行，我还以为是好几秒进一次函数，但没有和硬编码的15秒进一次函数作对比）。在加了日志打印后，我终于意识到这个问题，于是用dlv打断点一条条语句走，发现每一次在initiate函数这里都会停好久，然后会报err后重新循环。可惜之前的日志不会把err的内容打出来，否则可能会有很大帮助，因为err的内容是 `timeout`。

所以重现一下bug的"犯罪现场"：在主链路建立ipsec sa连接时突然断开路由造成超时，此时salost函数的sas传参仍然是之前的参数，在initiate这100个sa时，每个都超时，所以从来就没退出salost函数，直到每个ipsec sa都initiate"过关"。

修改截图：

![img](https://wl-toc-deepseek-api-files-prod.obs.cn-north-9.myhuaweicloud.com/raw/47e3/2026/3/12/file-d2ec6388-44df-4f19-a339-6fbe813780a6?response-content-disposition=attachment%3B%20filename%3D%22image.png%22&Expires=1773385813&AccessKeyId=OD83TSXECLFQNNSZ3IF6&Signature=yano84Si/R7yPnYV2vS7oqty74A%3D)

第二个bug是一个显示bug，用例跟第一个一样，但是操作过程中会出现前端显示数量不稳定的问题。前端显示的ipsec sa数量一直不到200个，并且还上下浮动；`swanctl --list-sas` 会发现有很多是重协商状态（相同的ipsec sa名称，但一个是rekeyed状态，一个是installed状态，前面第一个bug有铺垫），问题很可能就跟这个有关。

有了第一个bug的教训，在第二个bug上就应手多了。首先先确定解决的优先级，最容易定位的是api查询的地方，我在这里发现了过滤的问题。

![img](https://wl-toc-deepseek-api-files-prod.obs.cn-north-9.myhuaweicloud.com/raw/a0eb/2026/3/12/file-291d44ee-8ba1-482c-985c-dec936c6172f?response-content-disposition=attachment%3B%20filename%3D%22image.png%22&Expires=1773386792&AccessKeyId=OD83TSXECLFQNNSZ3IF6&Signature=6wddaobRG1MqVlxv/XXaZBGYzsE%3D)

假设像之前所说，相同的ipsec sa名称，但一个是rekeyed状态，一个是installed状态。第一个ipsec sa会在map里查到从而走到上面的if语句里面，在最后从map里delete掉，后面的installed状态就这样被过滤掉了。改的方式就是把两个ipsec sa合并，状态改成installed状态。

然后还有一个问题，为什么这么多ipsec sa在重协商状态。一般ipsec sa很久才会重协商一次，所以我打开了strongswan的日志，锁定一个ipsec sa开始观察：

![img](https://wl-toc-deepseek-api-files-prod.obs.cn-north-9.myhuaweicloud.com/raw/8142/2026/3/12/file-49aa7a52-78bb-433b-b043-33574138764a?response-content-disposition=attachment%3B%20filename%3D%22image.png%22&Expires=1773387001&AccessKeyId=OD83TSXECLFQNNSZ3IF6&Signature=0BGeNGdU9NcURX9%2BqUQ0jU4xBQg%3D)

看起来 `bak1-38` 这个ipsec sa是因为agent端触发initiate而重协商了，从agent上看日志果然如此，还是在这个坑人的salost函数里。因为ipsec sa数量很多，建立很慢，还没有稳定的时候salost函数就会initiate去检测有没有sa丢失。修改方式就是每次和前一次已经建立的sa数量对比，如果增加就不进salost函数。

原以为这样就解决了，但是修改后仍有大量rekeyed状态，查看日志仍然有initiate，定位到agent是另一个地方：在ike建立后会自己主动触发ipsec sa的initiate，但是strongswan已经开启ike协商之后ipsec sa同时协商了。

![img](https://wl-toc-deepseek-api-files-prod.obs.cn-north-9.myhuaweicloud.com/raw/8c45/2026/3/12/file-d0ea8bab-3ac6-423f-855f-cebe6819a215?response-content-disposition=attachment%3B%20filename%3D%22image.png%22&Expires=1773386997&AccessKeyId=OD83TSXECLFQNNSZ3IF6&Signature=ATnZgoma/Xr7ATdg81LzYsKP6us%3D)

从历史提交来看是这样的：项目最开始是关strongswan自动协商，开agent手动协商；但是后面不知道具体原因把自动重协商开了，然后可能是发现有问题又关了，agent手动协商的函数也被改过几次。最后一次是因为超时问题agent不会触发协商所以又开启了自动协商，所以又出现了这个功能。最后的选择还是把agent手动触发给关了，基本测试是没问题，但未来会不会又出现新的问题，我不知道。

修改截图：

![img](https://wl-toc-deepseek-api-files-prod.obs.cn-north-9.myhuaweicloud.com/raw/b641/2026/3/11/file-01082628-de11-4714-98da-f91c6a64e426?response-content-disposition=attachment%3B%20filename%3D%22image.png%22&Expires=1773387636&AccessKeyId=OD83TSXECLFQNNSZ3IF6&Signature=fzJaDzdkNTBiZoGiEPtdDt0U6/c%3D)

当然这次抓虫过程还是有些不顺意的地方，一开始日志报得太多，shell缓存太小导致我看不到之前的日志，不知道ipsec sa的installed状态是strongswan自己建立的，这给调试增加了些难度。

这就是两个bug修改的全部记录了。这次虽然又改进了些salost函数的逻辑，但可能未来还会出现各种各样的问题，这不由让我思考怎样的监测线程才不是那么激进的线程函数。于是我问了问AI：

一个"不那么激进"、足够稳健的检测线程，会通过以下机制来避免这种误判误改。

1. 持有强一致的"快照"视图

激进的线程往往是：看一眼 -> 觉得OK -> 动手改。
稳健的线程应该是：锁定视角 -> 确认一致 -> 动手改。

- 机制：使用读锁或事务内存。在"检测"阶段就加锁，确保在整个"检测+修改"过程中，线程看到的状态始终一致，不会被其他线程修改。
- 效果：防止"看一眼时状态是A，准备动手时已经被改成了B，但还是按A来操作"的情况。

2. 使用原子化的复合操作

误测的本质是"检测"和"修改"之间出现了时间差（间隙）。消除这个间隙，就不存在误判的基础。

- 机制：使用硬件或语言级支持的Compare-And-Swap（CAS，比较并交换）原语。
- 逻辑：线程会告诉CPU："我认为现在的值是X，如果是，我就把它改成Y；如果不是（说明被别人改了），我就不改，或者重试。"
- 效果：这是最经典的解决方案。如果线程基于错误的"认为"（比如实际值已不是X），修改操作会直接失败，不会发生误改。

3. 避免基于"过期缓存"的判断

在多核CPU架构下，一个线程修改了数据，另一个线程可能因为CPU缓存没有同步，依然读到旧值，从而做出错误判断。

- 机制：使用内存屏障或 `volatile`（谨慎使用）关键字，或者确保共享变量被原子类型（如C++的 `std::atomic<>`）管理。
- 效果：确保检测线程每次读取都是从主存中获取最新值，而不是读取自己CPU缓存中的陈旧副本，避免因"视觉残像"而误判。

4. 实施版本号校验

对于一些无法使用CAS的复杂数据结构，可以使用乐观锁策略。

- 机制：给数据附带一个版本号或时间戳。每次修改都递增版本号。检测线程在读取数据时先记下版本号；在计算完准备修改时，再次检查版本号是否变化。
- 效果：如果版本号变了，说明在检测期间数据已被他人修改，当前的计算结果已经过时，线程应放弃修改或重新执行，而不是盲目覆盖。

5. 分层确认策略（二次检查）

经典的双重检查锁（Double-Checked Locking）如果使用不当会有问题，但如果正确实现（配合原子变量），则是一种有效的防误测手段。

- 机制：先不加锁做一次快速检测（比如判断Map里有没有Key）；如果发现有，则直接返回；如果发现没有，再加锁进入第二层检测，确认在加锁的间隙是否有其他线程已经插入了该Key。
- 效果：防止"我以为没有，所以我来加"这种场景下的误操作。

一个"不那么激进"的检测线程，不会仅凭一次观察就贸然行动。它会通过锁、原子操作或版本控制，确保自己"以为"的状态和实际内存中的真实状态一致，然后再执行修改。如果发现不一致，它会选择等待、重试或放弃，而不是强行修改，从而保证了数据的完整性。

嗯，还挺有道理的。
