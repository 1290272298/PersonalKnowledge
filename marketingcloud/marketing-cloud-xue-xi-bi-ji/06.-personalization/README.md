# 06. Marketing Cloud Personalization

本章介绍 Salesforce Marketing Cloud Personalization（原 Interaction Studio / Evergage）的核心概念，涵盖身份识别、数据模型、Catalog、Sitemap、Web Template、Content Zone、Campaign 和客户端代码。

## 学习目标
- 区分 Marketing Cloud Engagement 与 Marketing Cloud Personalization
- 理解匿名访客、已知用户、身份合并和用户属性
- 理解 Catalog、事件数据与数据导入
- 理解 Sitemap 在网站采集和个性化中的作用
- 了解 Web Template、Content Zone 与 Campaign 的关系
- 掌握上线前验证、隐私和性能检查

## 学习路线
1. [Personalization 介绍](01.personalization-jie-shao.md)
2. [Data Model](02.data-model.md)
3. [Catalog](03.catalog.md)
4. [Sitemap](04.sitemap.md)
5. [Web Template](05.web-template.md)
6. [Content Zone](06.content-zone.md)
7. [Campaign](07.campaign.md)
8. [Client-side Code](08.client-side-code.md)

## 核心数据链路
```
Website / App
   ↓ Sitemap / SDK
Page View / User Action / Product Event
   ↓
Identity + User Profile + Catalog
   ↓
Segmentation / Decisioning
   ↓
Campaign + Web Template
   ↓
Content Zone / Website Experience
```

## 设计原则
- 先定义业务身份规则，再设计事件采集和用户数据导入。
- 匿名 ID 与登录用户 ID 的关联必须符合隐私政策和同意管理要求。
- Catalog ID、事件字段和导入数据必须保持稳定一致。
- Sitemap 应按页面类型和业务事件组织，不要在所有页面无差别发送事件。
- Campaign 发布前验证受众、优先级、频控、内容、设备和回退。
- 不在客户端代码中暴露 API Secret、访问令牌或个人敏感信息。

## 上线 Checklist
- [ ] 数据模型与身份规则已定义
- [ ] Catalog 字段和唯一 ID 规范确定
- [ ] Sitemap 页面类型、事件和身份逻辑完成
- [ ] 用户同意、隐私和数据保留策略确认
- [ ] Template / Content Zone 已在目标页面验证
- [ ] Campaign 受众、优先级和频控确认
- [ ] 客户端性能、错误日志和回退方案就绪

## 官方资料
- [Personalization Sitemap](https://developer.salesforce.com/docs/marketing/personalization/guide/personalization-sitemap.html)
- [Marketing Cloud Personalization Developer Documentation](https://developer.salesforce.com/docs/marketing/personalization/overview)
