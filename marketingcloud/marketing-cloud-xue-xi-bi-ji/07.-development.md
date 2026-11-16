# 07. Development

本章介绍 Marketing Cloud Engagement 开发中常用的 SQL、AMPscript 和 Server-Side JavaScript（SSJS），并说明适用场景、调试方法、安全要求和维护原则。

## 学习目标
- 使用 SQL Query Activity 完成 DE 数据筛选、关联、汇总和去重
- 使用 AMPscript 完成邮件个性化、条件内容和数据查询
- 使用 SSJS 处理 Script Activity、DE 操作和 API 请求
- 理解三种技术的执行环境差异
- 避免 SQL 性能、脚本安全和数据一致性问题

## 技术选型

| 技术 | 主要用途 | 常见执行位置 |
|---|---|---|
| SQL | 批量数据查询、清洗、关联、聚合 | Automation Studio SQL Query Activity |
| AMPscript | 邮件/页面个性化、动态内容、简单数据查询 | Email、CloudPages 等支持环境 |
| SSJS | 服务端脚本、DE 操作、HTTP/API 集成 | Script Activity、CloudPages 等支持环境 |

不要为了完成同一任务而随意混用技术。大量数据处理优先使用 SQL；消息内容个性化优先使用 AMPscript；需要流程控制、复杂服务端逻辑或 API 调用时再评估 SSJS。

---

## 1. SQL

### 1.1 常用结构
```sql
SELECT
    ContactKey,
    EmailAddress,
    Status
FROM [Customer_DE]
WHERE Status = 'Active'
```

常用语法：
- SELECT：选择输出字段
- WHERE：筛选记录
- JOIN：关联数据表
- DISTINCT：去重（需确认业务定义）
- GROUP BY：分组聚合
- CASE：条件映射
- 日期函数：日期过滤和计算

### 1.2 JOIN 示例
```sql
SELECT
    c.ContactKey,
    c.EmailAddress,
    o.OrderId,
    o.OrderDate
FROM [Customer_DE] c
INNER JOIN [Order_DE] o
    ON c.ContactKey = o.ContactKey
WHERE o.OrderStatus = 'Completed'
```
JOIN 前先确认两张表的粒度。若一个 Contact 有多笔订单，结果会产生多行；不要误认为 JOIN 后每个 Contact 仍只有一行。

### 1.3 每个 Contact 取最新一笔记录
可使用窗口函数时，按目标 SQL 环境支持的语法验证：
```sql
SELECT ContactKey, OrderId, OrderDate
FROM (
    SELECT
        ContactKey,
        OrderId,
        OrderDate,
        ROW_NUMBER() OVER (
            PARTITION BY ContactKey
            ORDER BY OrderDate DESC, OrderId DESC
        ) AS rn
    FROM [Order_DE]
) x
WHERE rn = 1
```
若当前 Query Activity 不支持所需函数，需改用可支持的聚合/分步查询方案，并在目标 BU 实测。

### 1.4 Target DE 与 Data Action
执行 SQL Query Activity 时，Target DE 的字段结构、主键和 Data Action 必须匹配查询结果：
- Overwrite：覆盖目标数据；适用于完整重建型结果集。
- Append：追加记录；需防止重复主键。
- Update：按主键更新匹配记录（实际行为按 Activity 选项）。
- Update / Add（如 UI 提供）：更新匹配记录并新增未匹配记录。

上线前确认字段映射、主键、空值、记录数和目标 DE 是否被其他流程使用。

### 1.5 性能与稳定性
- 只选择需要的列，不使用无意义的 SELECT *。
- 尽早筛选数据，减少 JOIN 输入规模。
- 避免无必要的多层子查询和重复全表扫描。
- 对日期过滤使用明确边界，注意时区和时间精度。
- 避免多个 Automation 同时覆盖同一 Target DE。
- 对大数据量拆分处理，并监控 Query Duration / Timeout。

### 1.6 SQL Checklist
- [ ] Source / Target DE 正确
- [ ] JOIN 键和数据粒度明确
- [ ] 去重规则明确
- [ ] Target DE 字段、主键、Data Action 匹配
- [ ] 空值和日期边界已测试
- [ ] 执行时间和结果数已验证

---

## 2. AMPscript

### 2.1 用途
AMPscript 主要用于消息内容和支持环境中的动态个性化，例如变量、条件判断、Lookup 查询和循环输出。

### 2.2 变量
```ampscript
%%[
VAR @firstName
SET @firstName = AttributeValue("FirstName")
]%%
Hello %%=v(@firstName)=%%
```
使用 AttributeValue 读取发送上下文属性，并对空值设置默认显示内容。

### 2.3 条件判断
```ampscript
%%[
VAR @memberType
SET @memberType = AttributeValue("MemberType")
IF @memberType == "VIP" THEN
]%%
VIP member offer
%%[ ELSE ]%%
Standard offer
%%[ ENDIF ]%%
```

### 2.4 Lookup
```ampscript
%%[
VAR @city
SET @city = Lookup("Customer_Profile", "City", "ContactKey", AttributeValue("ContactKey"))
]%%
```
Lookup 返回单值；若匹配多行，需要明确排序/选择规则，不能假设返回的是最新记录。

### 2.5 LookupRows
```ampscript
%%[
VAR @rows, @rowCount, @i, @row, @productName
SET @rows = LookupRows("Recommendation_DE", "ContactKey", AttributeValue("ContactKey"))
SET @rowCount = RowCount(@rows)
IF @rowCount > 0 THEN
  FOR @i = 1 TO @rowCount DO
    SET @row = Row(@rows, @i)
    SET @productName = Field(@row, "ProductName")
]%%
%%=v(@productName)=%%
%%[
  NEXT @i
ENDIF
]%%
```

### 2.6 注意事项
- 对空值、字段不存在和无匹配记录设置默认值。
- 不要在每个内容块中反复执行大量 Lookup。
- 避免将用户输入未经处理地输出到 HTML。
- 不要在 AMPscript 中暴露 API Secret 或敏感凭证。
- 复杂数据加工优先提前用 SQL 处理。

### 2.7 AMPscript Checklist
- [ ] 变量已声明并赋值
- [ ] 空值与无匹配结果有默认处理
- [ ] Lookup 条件唯一且正确
- [ ] 循环有合理上限
- [ ] 邮件预览、测试发送和实际发送上下文均验证

---

## 3. SSJS

### 3.1 用途
SSJS 用于 Marketing Cloud 服务器端 JavaScript 逻辑。Script Activity、CloudPages、邮件消息等执行环境的可用库和限制不同，必须按执行位置选择 API。Salesforce 建议：邮件消息中优先使用 AMPscript 或 Platform 对象的 SSJS 函数；Core Library SSJS 更适合 Landing Pages / Applications。SSJS 不支持浏览器 DOM 或任意外部 JavaScript 库。

### 3.2 基本结构
```javascript
<script runat="server">
Platform.Load("Core", "1.1.1");

try {
    var message = "Process started";
    Write(message);
} catch (e) {
    Write(String(e));
}
</script>
```
示例仅说明结构；生产脚本应根据执行环境和日志能力记录错误，不应将敏感数据直接输出到页面或日志。

### 3.3 Data Extension 操作
SSJS Core Library 提供 DataExtension 等对象用于读取/写入数据。注意：官方 Data Extension SSJS 函数文档说明，这些函数不支持 Enterprise-level Data Extensions；如果目标是企业级共享 DE，需改用受支持的 API / 其他处理方式并在目标 BU 验证。执行前确认：
- DE External Key / Customer Key 正确
- 字段名、类型和主键正确
- Add、Update、Upsert 等操作语义符合需求
- 大批量操作是否适合脚本，或应改用 SQL / Import Activity

### 3.4 API 调用
调用外部 API 时应考虑：
- HTTPS 和认证方式
- 超时、重试与幂等
- HTTP Status Code 与响应体校验
- JSON 解析异常
- 限流和服务端错误
- 凭证保管与轮换

不要把 Client Secret 写死在脚本源码中，也不要把访问令牌输出到日志。

### 3.5 错误处理
脚本应区分业务校验失败、网络错误、认证失败、服务端错误和数据写入失败。对可重试错误设置有限次数和退避策略；对不可重试错误记录上下文并告警。重复执行脚本前评估是否会重复写入或触发消息。SSJS Activity 存在执行超时限制；长时间、大批量数据转换优先使用 SQL / Automation 或专门的数据处理平台，不要把脚本当作无限时长 ETL。

### 3.6 SSJS Checklist
- [ ] 执行环境与可用库已确认
- [ ] DE Key / 字段 / 主键正确
- [ ] API 凭证安全保管
- [ ] HTTP 状态和响应体校验
- [ ] 异常、超时和重试有处理
- [ ] 重复执行不会产生非预期副作用

---

## 4. 技术选型示例

| 需求 | 优先考虑 | 原因 |
|---|---|---|
| 每日从大表筛选目标人群 | SQL | 批量数据处理 |
| 邮件中按会员等级显示不同文案 | AMPscript | 消息个性化 |
| 在 Automation 中调用外部服务 | SSJS / API 集成 | 需要服务端逻辑 |
| 从订单表计算每个客户累计金额 | SQL | 聚合和数据粒度 |
| 输出推荐商品列表 | 预处理 SQL + AMPscript | 将数据计算与展示分离 |

## 5. 通用开发规范
1. 使用有意义的字段名、变量名和注释。
2. 不在代码中硬编码环境相关 URL、Key 或密码。
3. 将测试数据与生产数据隔离。
4. 对输入、输出和数据量设置边界。
5. 保留代码版本、变更说明和回退方案。
6. 先小批量验证，再运行全量任务。
7. 记录执行时间、结果数量和错误摘要。

## 官方资料
- [Marketing Cloud Engagement APIs](https://developer.salesforce.com/docs/marketing/marketing-cloud/guide/apis-overview)
- [AMPscript Getting Started](https://developer.salesforce.com/docs/marketing/marketing-cloud-ampscript/guide/mc-ampscript-get-started.html)
- [Server-Side JavaScript](https://developer.salesforce.com/docs/marketing/marketing-cloud/guide/ssjs_serverSideJavaScript.html)
- [SSJS Data Extension Functions](https://developer.salesforce.com/docs/marketing/marketing-cloud/guide/ssjs_dataExtensionFunctions)
