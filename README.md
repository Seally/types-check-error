# TypeScript Definitions for `check-error`

This repository is like a staging area so I can easily test type definitions
before submitting to DefinitelyTyped.

According to the project's readme, `check-error` is a package for retrieving an
`Error`'s information such as its `message` or `constructor` name. It can also
check whether two Errors are compatible based on their messages, constructors,
or instances.

This library has been branched off from Chai assertion library. As of this
writing, it has not received any updates since October 2016, but the main
Chai assertion library still depends on it as of v4.2.0.

_Code repository:_ <https://github.com/chaijs/check-error>

_NPM entry:_ <https://www.npmjs.com/package/check-error>

## Notes

On Windows, if you want `dtslint` to stop complaining about the lack of NPM
packages with a matching name, you need to:

1. Add `curl` to the `PATH`.
2. Monkey patch the `download-file-sync` package in `node_modules` by adding
   `--ssl-no-revoke` to the list of arguments passed by `child_process` to
   `curl`.

If this really annoys you, create an issue regarding this to
[`dts-critic`](https://github.com/sandersn/dts-critic).
