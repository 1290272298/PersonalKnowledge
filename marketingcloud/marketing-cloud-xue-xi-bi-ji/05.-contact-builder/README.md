# 05. Contact Builder

本章介绍 Marketing Cloud Engagement 的 Contact 数据组织方式，重点理解 Contact、Subscriber、Contact Key、Data Extension、Attribute Group 和 Data Designer 之间的关系。

## 学习目标
- 区分 Contact、Subscriber、Contact Key 与 Contact ID
- 理解 Contact Model 与 Attribute Group
- 使用 Data Designer 建立数据关系
- 判断一对一、一对多关系及其对 Journey 的影响
- 设计稳定的 Contact Key，避免重复 Contact 和不必要的 Contact 膨胀

## 学习路线
1. [Contact Builder 介绍](01.contact-builder-jie-shao.md)
2. [Contact Model](02.contact-model.md)
3. [Attribute Group](03.attribute-group.md)
4. [Data Designer](04.data-designer.md)
5. [Relationship](05.relationship.md)
6. [Contact Key 与数据关系](06.contact-key-yu-shu-ju-guan-xi.md)

## 核心概念
- Contact：跨渠道统一识别的个人/实体记录。
- Subscriber：某个消息渠道中的订阅者，例如 Email Studio Subscriber。
- Contact Key：业务侧提供的稳定标识，用于关联同一个 Contact。
- Contact ID：平台内部用于标识 Contact 的系统 ID。
- Attribute Group：将相关数据源按关系组织起来的逻辑数据组。
- Data Designer：配置 Contact 数据模型、Attribute Group 和关系的工具。

## 设计原则
1. 优先使用稳定、非易变且跨渠道一致的 Contact Key。
2. 不要默认 Email Address 等于 Contact Key。
3. 在设计 Attribute Group 前先画出实体关系和基数。
4. 一对多数据不能随意当作一对一属性使用；需明确如何筛选最新/目标记录。
5. 只把实际需要用于营销的 Contact 纳入模型，避免无必要的 Contact 创建和计费/治理影响。
6. 删除 Contact、清理数据或重建关系前，评估所有渠道、Journey、报表和集成依赖。

## 上线前 Checklist
- [ ] Contact Key 规则已定义并跨渠道一致
- [ ] Subscriber 与 Contact 的关系清楚
- [ ] DE 主键、Sendable Relationship 和字段类型正确
- [ ] Attribute Group 的关联字段与基数正确
- [ ] 一对多记录的业务规则明确
- [ ] 数据模型变更已评估 Journey / Send / API 影响

## 官方资料
- [Configure Contact Data Models](https://trailhead.salesforce.com/content/learn/modules/marketing-cloud-contact-management/configure-contact-models)
- [Contact Model Relationships](https://trailhead.salesforce.com/content/learn/modules/marketing-cloud-contact-management/understand-contacts-and-contact-model-relationships)
