# Sprint Guardrail Agent

[![Apache 2.0 license](https://img.shields.io/badge/license-Apache%202.0-blue.svg?style=flat-square)](LICENSE)

[Atlassian's Sprint planning meeting guide](https://www.atlassian.com/agile/scrum/sprint-planning) explains:
> In scrum, the sprint is a set period of time where all the work is done.
> However, before you can leap into action you have to set up the sprint.
> You need to decide on how long the time box is going to be,
> the sprint goal, and where you're going to start.
> The sprint planning meeting kicks off the sprint by setting the agenda and focus.
> If done correctly, it also creates an environment where the team is
> motivated, challenged, and can be successful.
> Bad sprint plans can derail the team by setting unrealistic expectations.

Although "bad sprint plans" will always have elements of subjectivity,
this project captures some common sprint planning problems
in the form of an AI Agent
to evaluate the quality of a [sprint](https://www.atlassian.com/agile/tutorials/sprints).

You can install it directly using
[this link](https://developer.atlassian.com/console/install/496a1f34-02f3-48b5-9e2a-1855a72a6f2f?signature=AYABeB4HL6sP9vV18mg8%2Bfo8g8sAAAADAAdhd3Mta21zAEthcm46YXdzOmttczp1cy1lYXN0LTE6NzA5NTg3ODM1MjQzOmtleS83ZjcxNzcxZC02OWM4LTRlOWItYWU5Ny05MzJkMmNhZjM0NDIAuAECAQB4KVgoNesMySI2pXEz4J5S%2B4but%2FgpPvEEG0vL8V0Jz5cBx5M1oXpnkhV7gE%2BS285ZGQAAAH4wfAYJKoZIhvcNAQcGoG8wbQIBADBoBgkqhkiG9w0BBwEwHgYJYIZIAWUDBAEuMBEEDMBIjCdsKy4h4vhI4gIBEIA7nE7iBCYQ7nCNvUzjENocql8Yt1FlZYPteBHue6KpcMs2q%2BIPCcPsLzVxf1utGKxvYYGFYd%2BNMjc5ikQAB2F3cy1rbXMAS2Fybjphd3M6a21zOmV1LXdlc3QtMTo3MDk1ODc4MzUyNDM6a2V5LzU1OWQ0NTE2LWE3OTEtNDdkZi1iYmVkLTAyNjFlODY4ZWE1YwC4AQICAHig7hOcRWe1S%2BcRRsjD9q0WpZcapmXa1oPX3jm4ao883gFQUYC6UybaN7VxBVm8zbVSAAAAfjB8BgkqhkiG9w0BBwagbzBtAgEAMGgGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQM5kDfS0PpwIk3d9MUAgEQgDt7o7OfHXGMm2ObUC28DIDeT6iUMbBcRrUso20dfzis6dE5QVj%2F93nv0TI3Jhl2GSVspLiUgMg457RbuAAHYXdzLWttcwBLYXJuOmF3czprbXM6dXMtd2VzdC0yOjcwOTU4NzgzNTI0MzprZXkvM2M0YjQzMzctYTQzOS00ZmNhLWEwZDItNDcyYzE2ZWRhZmRjALgBAgIAeBeusbAYURagY7RdQhCHwxFswh7l65V7cwKp%2BDc1WGoHAQnYdiK090ooIh9MIHYcSTcAAAB%2BMHwGCSqGSIb3DQEHBqBvMG0CAQAwaAYJKoZIhvcNAQcBMB4GCWCGSAFlAwQBLjARBAxfG9a8V8qp149ziBoCARCAOzyXduScWHq79m389tRJCVWuc71aAxdaQgecsWXce6Ylj51IS5X3f8ThmnALdOTS6jn3V5IazBL6ak%2FDAgAAAAAMAAAQAAAAAAAAAAAAAAAAANjDpNRI4WQradDtyxXfIm7%2F%2F%2F%2F%2FAAAAAQAAAAAAAAAAAAAAAQAAADIRhX2V0QQ0ZOW0sw4vOwVSIhJT2huv0bJhHnHpubbWCqKGvU5F6k978MVG1WE5ltrRF1xAZuD2j60I6BC3NJSyfPs%3D&product=jira).
Once installed you can use it directly as a Forge Agent,
or you can make your own sprint rules leveraging
the "Fetch Sprint details" [Action](https://support.atlassian.com/rovo/docs/agent-actions/).
You can learn from it directly by reading
the [agent instructions](./prompts/agent-instructions.md) (ie the prompt).
You can explore interactively with "no code".
Just copy/paste those instructions into [Rovo Agent instructions](https://support.atlassian.com/rovo/docs/write-instructions-for-your-agent/)
(Note: these Agent Instructions use the "Forge Sprint details" Action,
which structures sprint context).
You can explore as a "pro code" project by forking,
and modifying the prompt and code-based actions.

- **Rovo**. If you're new to Rovo,
[check out how it helps teams quickly discover knowledge across Atlassian and third-party SaaS apps with less time and effort.](https://www.atlassian.com/software/rovo)
- **Atlassian Forge**. If this is your first Forge app,
[try a simple "hello world" app first](https://go.atlassian.com/forge)

Questions?
Join the Rovo conversation in
[the Atlassian user community](https://community.atlassian.com/t5/Rovo/ct-p/rovo-atlassian-intelligence),
or the Forge conversation in
[the Atlassian developer community](https://community.developer.atlassian.com/c/rovo/138).

## Contributions

Contributions to the Forge Rovo Sprint Guardrail Agent repo are welcome!
Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

Copyright (c) 2025 Atlassian US., Inc.
Apache 2.0 licensed, see [LICENSE](LICENSE) file.

[![With ❤️ from Atlassian](https://raw.githubusercontent.com/atlassian-internal/oss-assets/master/banner-with-thanks-light.png)](https://www.atlassian.com)
