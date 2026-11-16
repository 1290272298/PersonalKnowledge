# 04. Journey Builder

本章从客户旅程设计、入口事件、Contact 识别、Activity 执行、分支判断、退出与目标、版本发布及监控，系统介绍 Journey Builder。

## 学习目标
完成本章后，应能够：
- 解释 Journey Builder 与 Automation Studio 的职责边界
- 设计 Entry Source、Entry Event 与 Contact Key
- 区分 Journey Data、Contact Data、Decision Split 与 Engagement Split
- 设计 Wait、Email、Salesforce Data 等 Activity
- 正确配置 Re-entry、Exit Criteria、Goal 和版本发布
- 根据 Journey History、Tracking 与数据模型定位问题

## 学习路线
1. [Journey Builder 介绍](01.journey-builder-jie-shao.md)
2. [Journey](02.-journey.md)
3. [Entry Source](02.entry-source.md) / [Entry Event](03.entry-event.md)
4. [Activities](04.activities.md)、[Decision Split](05.decision-split.md)、[Engagement Split](06.engagement-split.md)、[Wait](07.wait.md)
5. [Email Activity](08.email-activity.md)、[Salesforce Data Activity](09.salesforce-data-activity.md)
6. [Exit Criteria](11.-exit-criteria.md)、[Goal](12.-goal.md)、[Journey Settings](13.-journey-settings.md)
7. [版本管理](14.-journey-ban-ben-guan-li.md)、[发布](15.-journey-fa-bu.md)、[监控](16.-journey-jian-kong.md)、[Tracking](17.-journey-shu-ju-yu-tracking.md)
8. [常见问题](18.-journey-chang-jian-wen-ti.md)与[实战案例](19.-journey-shi-ji-an-li.md)

## 核心概念
- **Entry Source**：定义旅程入口的数据来源。
- **Entry Event**：定义触发旅程启动的事件。
- **Journey Data**：本次进入旅程时携带的入口数据及活动输出数据。
- **Contact Data**：Contact Builder 数据模型中与 Contact 关联的数据。
- **Activity**：旅程执行的消息、等待、判断、更新等操作。
- **Exit Criteria / Goal**：分别用于移除不再适合继续旅程的 Contact，以及衡量业务目标；Goal 可按配置兼作退出条件。

## 设计原则
1. 先确定业务目标和 Contact Key，再设计入口和分支。
2. 判断条件必须明确数据来源、字段类型、更新时间和空值处理。
3. 不把 Email Open 当成绝对可靠的阅读证明；隐私代理、图片代理和客户端行为会影响打开统计。
4. 先在测试环境验证入口、分支、发送对象和退出规则，再 Activate。
5. 修改运行中的旅程时，先评估版本切换对已进入 Contact 的影响。

## 发布前 Checklist
- [ ] Entry Source / Event 与字段映射正确
- [ ] Contact Key 稳定、跨渠道一致
- [ ] Re-entry 规则符合业务要求
- [ ] Journey Data 与 Contact Data 使用正确
- [ ] Split 条件、优先级、Remainder 路径已测试
- [ ] Wait 时长、时区和发送窗口正确
- [ ] Email、发送分类、发送人和测试内容正确
- [ ] Exit Criteria、Goal 和退出时点已验证
- [ ] 版本切换及停止影响已评估
- [ ] 监控负责人、告警和故障处理方式已明确

## 官方资料
- [Journey Builder Overview](https://trailhead.salesforce.com/content/learn/modules/journey-builder-basics/get-started-with-journey-builder)
- [Journey Builder Activities](https://help.salesforce.com/s/articleView?id=mc_jb_canvas_activities.htm&type=5)
- [Journey Builder Split and Join Activities](https://help.salesforce.com/s/articleView?id=mc_jb_split_join_activities.htm&type=5)
- [Goals in Journey Builder](https://help.salesforce.com/s/articleView?id=mc_jb_goals.htm&type=5)
