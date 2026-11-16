# 09. Deliverability

本章介绍 Marketing Cloud Engagement 邮件送达率、Bounce、Block Bounce、Held、Spam Complaint、List Detective 和 SPF / DKIM / DMARC。

## 学习目标
- 区分发送成功、投递、Bounce 和收件箱位置
- 理解 Hard Bounce、Soft Bounce、Block Bounce 与 Held
- 识别 Spam Complaint 与退订的区别
- 理解 List Detective 的数据检查用途
- 理解 SPF、DKIM、DMARC 的认证关系
- 建立持续的 Deliverability 监控和排查流程

## 学习路线
1. [Deliverability 介绍](01.deliverability-jie-shao.md)
2. [Bounce](02.bounce.md)
3. [Block Bounce](03.block-bounce.md)
4. [Held](04.held.md)
5. [Spam](05.spam.md)
6. [List Detective](06.list-detective.md)
7. [SPF / DKIM / DMARC](07.spf-dkim-dmarc.md)
8. [Deliverability 管理](08.deliverability-guan-li.md)

## 排查总流程
```
Send / Job
   ↓
Subscriber Status / Suppression
   ↓
Bounce / Block / Complaint
   ↓
Sender Domain / IP Reputation
   ↓
SPF / DKIM / DMARC / DNS
   ↓
ISP Response / Inbox Placement
```

## 核心原则
- Sent 不等于 Delivered；Delivered 也不等于进入 Inbox。
- 不要通过反复重发来验证送达问题。
- 先区分单个地址问题、域名问题、IP/账号问题和收件方策略问题。
- 保护订阅状态和投诉反馈，不能为了发送量而绕过退订/抑制。
- DNS 认证变更应由域名管理员实施，并在上线前验证。

## 监控 Checklist
- [ ] Bounce、Block、Held、Complaint 和 Unsubscribe 有监控
- [ ] 域名、IP 和认证状态定期检查
- [ ] 发送量和受众增长平稳
- [ ] 退订、投诉和无效地址及时处理
- [ ] 故障按 ISP、域名、IP、发送类型分类
- [ ] 认证记录变更有审批与回退

## 官方资料
- [Deliverability Tools and Reports](https://help.salesforce.com/s/articleView?id=000382434&language=en_US&type=1)
- [Email Sender Authentication](https://help.salesforce.com/s/)
