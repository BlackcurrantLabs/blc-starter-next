# Blackcurrant Stack

This is a boilerplate for starting new projects. 
It's an opionated set of frameworks and tools hand picked for our general use cases.
This may not fit every use case.

## Stack

| Category                   | Technology/Tool                      |
|----------------------------|--------------------------------------|
| Framework                  | NextJS                               |
| ORM                        | Prisma, Typescripe backend           |
| Authentication             | BetterAuth + BetterAuthUI            |
| Styling                    | Tailwind                             |
| Components                 | Shadcn, Daisy UI                     |
| Frontend State Management  | Context API                          |
| Emails                     | SMTP, can connect to any service     |
| Long running Jobs          | Trigger.dev                          |
| Deployment                 | Vercel / Railway / AWS (self-hosted) |
| Tables                     | Tanstack Tables                      |
| Forms                      | react-hook-form                      |

## Goals

1. Landing page fully customised as per project, hosted with SSR with sign-in, sign-up and account button if already logged in. Redirect to user home if logged in.
2. Static pages like privacy policy and terms of use
3. Favicon, Robots.txt
4. Multiple user types with their own home page like Admin, User
5. Extensible APIs with auth that can be used with mobile clients
6. Parts of website that the users can see without a login
7. Parts of website that the user can only see after a login
8. Parts of website that the user can see only after custom attribute passes verification (maker/checker model)
9. Best in class DX with end to end typesafety
10. Support for long running jobs via trigger.dev with realtime job status in frontend
11. Admin side custom permissions and actions
12. A working template of table with serverside search, pagination, filtering, sorting
13. A working template of table with client side pagination
14. A working template of ideal implementation of forms following best practises with serverside and clinetside validation, synced schema
15. JWT based flow for mobile clients using apis

# Ecosystem Tools

## Form Builder
Build with https://www.shadcn-form.com/playground

## Placeholder Blocks
https://www.hyperui.dev/
