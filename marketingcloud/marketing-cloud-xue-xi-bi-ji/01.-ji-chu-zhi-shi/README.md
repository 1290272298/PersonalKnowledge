# 01. 基础知识

本章建立 Marketing Cloud Engagement 的基础心智模型：产品边界、Enterprise / BU、用户权限、Contact 身份、Subscriber 订阅、Data Extension 数据结构，以及这些对象如何共同影响发送与 Journey。

## 学习路线

1. [Marketing Cloud Engagement 是什么](01.-jie-shao.md)：产品定位、能力边界、营销闭环。
2. [产品体系与功能关系](02.-chan-pin-ti-xi-yu-gong-neng-guan-xi.md)：数据、内容、执行、渠道、分析之间的关系。
3. [Business Unit（BU）](03.-business-unit-bu.md)：BU 的用途、隔离与共享。
4. [Enterprise / Parent BU / Child BU](04.-enterprise-parent-bu-child-bu.md)：账号层级和组织结构。
5. [Subscriber / Contact](05.-subscriber-contact.md)：订阅对象与跨渠道客户身份。
6. [Subscriber Key](06.-subscriber-key.md)：Email Studio 中的订阅者识别键。
7. [Contact Key](07.-contact-key.md)：跨渠道 Contact 身份键及其设计。
8. [Data Extension（DE）](08.-data-extension-de.md)：表结构、主键、发送关系和数据生命周期。
9. [All Subscribers](09.-all-subscribers.md)：Email 订阅状态的管理位置。
10. [Subscriber Status](10.-subscriber-status.md)：Active、Unsubscribed、Bounced、Held 的差异。

## 本章核心模型

```
Enterprise / Account
  └─ Business Units：组织、访问范围与资源上下文
       ├─ Users / Roles / Permissions
       ├─ Data Extensions：业务数据表
       ├─ Content / Email / Automation / Journey
       └─ Send Context：决定使用哪些数据与订阅规则

Contact Key：识别一个跨渠道 Contact
  └─ Subscriber Key：Email Studio 中的订阅者标识
       └─ Subscriber Status：Email 订阅/发送状态
```

## 学习时必须区分的四件事

| 概念 | 回答的问题 | 不应混淆为 |
|---|---|---|
| BU | 当前在哪个业务空间操作？ | 文件夹或独立租户 |
| Contact Key | 这个人是谁？ | Email 地址 |
| Subscriber Status | 这个订阅者当前能否按发送规则接收 Email？ | DE 中的业务状态字段 |
| Data Extension | 数据以什么结构保存？ | Subscriber / Contact 本身 |

## 推荐学习方法

- 先理解对象和关系，再进入具体 Studio 的操作。
- 用同一个虚构客户案例贯穿各页，例如 Customer ID = C10001。
- 遇到产品许可、BU 设置、发送分类或 UI 版本差异时，以当前账号实际配置和 Salesforce 最新文档为准。
- 不要把一个 BU、一个数据集或一个客户项目的特殊配置推广为所有账号的通用规则。

## 本章完成标准

- [ ] 能解释 Marketing Cloud Engagement 与其他 Salesforce 营销产品的边界。
- [ ] 能画出 Enterprise / BU 层级，并说明用户权限与资源归属。
- [ ] 能解释 Contact、Subscriber、Contact Key、Subscriber Key 的关系。
- [ ] 能设计一个具备主键、字段类型和 Send Relationship 的 DE。
- [ ] 能区分 All Subscribers 状态与 DE 业务字段。
- [ ] 能从 BU、Key、DE、Status、Send Context 五个角度初步排查邮件未发送问题。
