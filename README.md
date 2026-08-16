# Jason V — Research Portfolio

A static research-engineering portfolio organized around:

**Research → Experiment → Build → Evidence**

The portfolio deliberately keeps the selected body of work small. Projects are presented as artifacts of continuing research directions rather than as a catalogue of applications.

## Selected systems

- OpenRails
- NOX ACCORD
- Concord
- RJP
- Noema
- Engram
- Thinking Reed

## Local preview

No build step is required.

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## GitHub Pages

The repository contains `.github/workflows/pages.yml` using GitHub's Pages Actions flow.

After creating the repository and pushing this tree to `main`:

1. Open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Run the workflow or push to `main`.

The site uses relative paths, so it works as either a user site (`<user>.github.io`) or a project site (`<user>.github.io/<repo>/`).

## Content model

`data/research.json` is the canonical structured portfolio data. It stores research directions, project status, research questions, hypotheses, experiments, evidence, boundaries, and lineage. The HTML is intentionally static for Pages reliability, but future tooling can regenerate pages from the same data.

## Truth boundary

The portfolio preserves project maturity. Foundations, active research systems, testnet systems, and public builds are not presented as equivalent production deployments.

## One-command publish after the repository exists

From the extracted site directory:

```bash
./scripts/publish.sh https://github.com/etvjay/Jay.git
```

This verifies the static site, initializes Git if necessary, commits the current tree, sets `origin`, and pushes `main`. GitHub Pages still needs **Settings → Pages → Source: GitHub Actions** enabled once for the repository.
