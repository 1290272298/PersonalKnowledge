# 08. API / Integration

本章介绍 Marketing Cloud Engagement API、OAuth 认证、REST / SOAP、Data Extension、发送 API，以及 Salesforce 和 MuleSoft 集成。

## 学习目标
- 理解 REST 与 SOAP API 的职责和差异
- 使用 Installed Package 创建 API Integration
- 理解 OAuth 2.0 Token 获取与访问范围
- 了解 Data Extension API 与发送 API 的常见用途
- 设计安全、可监控、可重试的系统集成

## 学习路线
1. [API 介绍](01.api-jie-shao.md)
2. [REST API](02.rest-api.md)
3. [SOAP API](03.soap-api.md)
4. [OAuth](04.oauth.md)
5. [Data Extension API](05.data-extension-api.md)
6. [Send API](06.send-api.md)
7. [Salesforce Integration](07.salesforce-integration.md)
8. [MuleSoft Integration](08.mulesoft-integration.md)

## 通用集成流程
```
External System
   ↓
Installed Package / API Integration
   ↓
OAuth 2.0 Token
   ↓
REST / SOAP API
   ↓
Marketing Cloud Resource
   ↓
Response / Logging / Retry
```

## 安全与稳定性原则
- 使用 Installed Package 的 Server-to-Server / Web App 等适合场景的 API Integration。
- Client Secret 仅保存在安全服务端，不放入浏览器、Git 仓库或日志。
- 按最小权限配置 Scope，并定期轮换凭证。
- 处理 Token 过期、限流、超时、5xx 和业务错误。
- 对写入、导入和发送操作设计幂等键，防止重复处理。
- 记录请求 ID、业务 ID、状态码和脱敏后的错误摘要。

## 上线 Checklist
- [ ] API Integration 类型、权限和 Scope 已确认
- [ ] Auth / REST / SOAP Base URI 使用当前 Package 中的值
- [ ] Token 安全存储与刷新机制完成
- [ ] 请求和响应 schema 已验证
- [ ] 重试、幂等、限流和超时已设计
- [ ] 日志脱敏、告警和凭证轮换已准备

## 官方资料
- [Marketing Cloud Engagement API Overview](https://developer.salesforce.com/docs/marketing/marketing-cloud/guide/apis-overview)
- [Authenticate SOAP API Calls](https://developer.salesforce.com/docs/marketing/marketing-cloud/guide/authenticate-soap-api.html)
- [WSDL and Endpoint Links](https://developer.salesforce.com/docs/marketing/marketing-cloud/guide/wsdl-endpoint-links.html)
