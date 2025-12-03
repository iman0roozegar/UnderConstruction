Blazor Interactive Auto — README

A step-by-step README for a Blazor Web App (InterActiveAuto) using
Tailwind CSS v4, tailwindcss-animated, and DaisyUI (pastel + dark
themes). The Tailwind toolchain is located at the solution root, shared
by both projects.

------------------------------------------------------------------------

1 — Project Layout

    /SolutionRoot
      |-- package.json
      |-- package-lock.json
      |-- /UnderConstruction
      |     |-- /UnderConstruction
      |     |-- /UnderConstruction.Client
      |-- UnderConstruction.slnx

------------------------------------------------------------------------

2 — Prerequisites

-   .NET SDK
-   npm
-   VS 2026 or VS Code

------------------------------------------------------------------------

3 — Install Dependencies
    at the root foldet of the Solution, install tailwindcss and tailwindcss-animated and daisy ui:
    1. npm install tailwindcss @tailwindcss/cli
    2. npm install -D tailwindcss-animated
    3. npm i -D daisyui@latest

    to run the watcher:
    use this:
    npx @tailwindcss/cli -i ./UnderConstruction/UnderConstruction/wwwroot/app.css -o ./UnderConstruction/UnderConstruction/wwwroot/assets/css/tailwind.css --watch

------------------------------------------------------------------------

4 — app.css

PATH: ./UnderConstruction/UnderConstruction/wwwroot/app.css

------------------------------------------------------------------------

5 — Build / Watch

    npx @tailwindcss/cli -i ./UnderConstruction/UnderConstruction/wwwroot/app.css -o ./UnderConstruction/UnderConstruction/wwwroot/assets/css/tailwind.css --watch
    dotnet run

------------------------------------------------------------------------

6 — AuraBackground Usage

the site.js is super IMPORTANT!
and as you know it should be OnAfterRenderASync

------------------------------------------------------------------------

7 — Responsive Guidelines

Use Tailwind breakpoints (sm:, md:, lg:, etc.).

------------------------------------------------------------------------

8 — Theme Toggling

Theme Toggling is based on the sunset and sunrise of Tehran Time. Remember to change it if you have diffrent Time

------------------------------------------------------------------------

12 — Production Build

    npx @tailwindcss/cli -i ./UnderConstruction/UnderConstruction/wwwroot/app.css -o ./UnderConstruction/UnderConstruction/wwwroot/assets/css/tailwind.css 
    dotnet publish -c Release UnderConstruction/UnderConstruction.csproj (or: UnderConstruction/UnderConstruction/UnderConstruction.csproj )

------------------------------------------------------------------------

13 — Troubleshooting

-   CSS not loading → check output path & reference tag.

