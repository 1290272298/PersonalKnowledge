# 03. Automation Studio

## 本章学习目标
学习如何使用 Automation Studio 编排定时任务、文件导入导出、SQL 数据加工、脚本和邮件发送。重点是理解任务依赖、数据流向、执行结果和异常恢复。

完成本章后，应能够：
- 区分 Automation、Schedule、Step 和 Activity。
- 根据业务场景选择定时、文件触发或 API 启动方式。
- 设计 Import → SQL → Extract / Send 的任务链。
- 理解 SQL Query、Import、File Transfer、Data Extract 和 Script 的职责边界。
- 检查执行历史、Activity 结果、数据数量和文件状态。
- 识别失败任务的根因，并安全地恢复执行。

## 学习路线
| 顺序 | 页面 | 学习重点 |
|---|---|---|
| 01 | Automation Studio 介绍 | 产品职责、典型应用 |
| 02 | Automation | Automation / Step / Activity 结构与依赖 |
| 03 | Schedule | 定时、一次执行、File Drop 与触发方式 |
| 04 | SQL Query Activity | 查询、目标 DE、更新方式、性能和错误 |
| 05 | Import Activity | 文件导入、映射、数据动作和校验 |
| 06 | File Transfer Activity | Safehouse、解压/解密、文件移动 |
| 07 | Data Extract Activity | 数据导出、文件生成和后续传输 |
| 08 | Script Activity | SSJS 适用场景、权限和安全 |
| 09 | Automation 监控 | 执行历史、错误定位、恢复与告警 |
| 10 | Automation Studio 实战流程 | 端到端设计、依赖与上线检查 |

## 建议实践环境
使用非生产 BU、测试 DE 和测试 FTP 目录。每次练习记录 Automation 名称、Activity 名称、运行时间、输入输出记录数和执行结果。

> 产品菜单、可用 Activity、触发方式和权限会因账号配置与许可而异。请以当前账号 UI 和 Salesforce 官方文档为准。不要将示例文件名、DE 名称或 SQL 直接用于生产环境。
