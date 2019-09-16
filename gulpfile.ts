import gulp = require('gulp');
import undertaker = require('undertaker');

import del = require('del');

import TaskFunction = undertaker.TaskFunction;
import TaskFunctionBase = undertaker.TaskFunctionBase;
import TaskFunctionParams = undertaker.TaskFunctionParams;

const { series, parallel } = gulp;

/******************************************************************************
 * Task Definitions                                                           *
 ******************************************************************************/

const dist = gulpTask(
    () => {
        return gulp
            .src(['package.json', 'LICENSE.txt', 'README.md'])
            .pipe(
                gulp.src(['types/check-error/**/*.d.ts'], {
                    base: 'types/check-error',
                }),
            )
            .pipe(gulp.dest('dist'));
    },
    {
        description: 'Create distributable folder in ./dist.',
    },
);

const cleanDist = gulpTask(
    () => {
        return del('./dist/**');
    },
    {
        description: 'Clean up "./dist".',
    },
);

/******************************************************************************
 * Gulp Create Task Helpers                                                   *
 ******************************************************************************/

/**
 * Creates a Gulp task with additional properties. Workaround for TypeScript
 * not usually allowing properties being added to functions.
 *
 * The `name` property will be taken from `opts` if it's specified, or whatever
 * the `task.name`'s value is.
 *
 * _Warning:_ This function copies the `task` function using `task.bind({})`.
 * Do _not_ reference `this` in the original function.
 *
 * @param task - task function
 * @param opts - task metadata
 */
function gulpTask(task: TaskFunctionBase, opts: TaskFunctionParams): TaskFunction {
    const { name, ...otherOpts } = opts;

    const taskFunc = Object.assign(task.bind({}), otherOpts);

    // 'name' on functions is a readonly property. But we can use
    // Object.defineProperty() to force change it.
    if (name !== undefined) {
        Object.defineProperty(taskFunc, 'name', { value: name });
    } else if (task.name) {
        Object.defineProperty(taskFunc, 'name', { value: task.name });
    }

    return taskFunc;
}

/******************************************************************************
 * Export Gulp Tasks                                                          *
 ******************************************************************************/
exports.dist = dist;
exports.clean = gulpTask(series(cleanDist), {
    description: 'Cleans up output files and folders.',
});
exports['clean-dist'] = cleanDist;
