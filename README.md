# hsmusic-lang

Language files for the [Homestuck Music Wiki](https://hsmusic.wiki/). These are developed in Google Sheets; see [Project Outline][outline] and [Working Sheets][sheets]. This repository tracks versions of the language files and provides utilities for working with them. You can use this repo locally to try out changes live.

## Updating language YAMLs from CSV sheets

Download the language sheet as a CSV, then run `node util/language-csv-to-yaml.js`, providing the path to the CSV. It'll write to stdout, so pipe into the corresponding YAML:

    node util/language-csv-to-yaml.js es.csv > es.yaml

This script dynamically loads internal dependencies from hsmusic's codebase (yes it's a hack!). It's hard-coded to expect a project layout that looks something like this:

    path/to/my/hsmusic/
      code/  (hsmusic-wiki)
      lang/  (hsmusic-lang)

If your project layout looks different, edit `HSMUSIC_PATH` at the top of `util/language-csv-to-yaml.js`.

Always run with the appropriate branch checked out in hsmusic-wiki (e.g. `preview` if you're committing to `preview`), and with the latest changes pulled; YAML generation is structured according to the built-in `strings-default.yaml` file and CSV rows that don't correspond to that file will end up unused under `meta.unmapped`.

If you're committing to a main branch (and not just tracking changes locally), always check in (commit) changes to the CSV and YAML at the same time.

## Previewing and manually editing YAMLs

Set `HSMUSIC_LANG=lang` (or `hsmusic-lang`, or the name of this repository) in your environment variables, or provide the path to it via `--lang-path=lang` (etc). The wiki should automatically react to changes you save in the YAML, displaying e.g. "Updated language Español (es)" in the log. Reload the page in your browser to see the results.

If you're working locally and want to keep track of your changes with git, you can do so with commits in your own branch, but **don't file pull requests here.** We're continuing to use Google Sheets for reviewing and signing off changes. Refer to the [Project Outline][outline] for information.

  [outline]: https://docs.google.com/document/d/1WLkw1Q-OECXdaNB4LB8neL92F1JNL0q1gGn8zVpZLec/edit#heading=h.rod7im186gkc
  [sheets]: https://docs.google.com/spreadsheets/d/1BUSanXH5FNU0thJAcW5bw41UuuxKbMHkGsPxt9eyQ4U/edit#gid=0
