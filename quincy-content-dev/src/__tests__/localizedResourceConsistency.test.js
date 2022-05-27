const fs = require("fs");
const glob = require("fast-glob");
const path = require("path");
// const yaml = require("js-yaml");

const presetLocale = "en";
const otherLocales = ["de"];

describe("Test-Suite localized file Consistency Check", () => {
    let localeDirectories = [];
    const presetDirectories = glob.sync(["**/" + presetLocale], {
        onlyDirectories: true,
    });

    for (const presetDir of presetDirectories) {
        for (const locale of otherLocales) {
            localeDirectories.push([path.dirname(presetDir), locale]);
            console.log(localeDirectories);
        }
    }

    test.each(localeDirectories)(
        "English resources of %s have their counterparts in %s",
        (baseDir, locale) => {
            const presetLocaleFiles = fs.readdirSync(
                `${baseDir}/${presetLocale}`
            );

            const otherLocaleFiles = fs.readdirSync(`${baseDir}/${locale}`);
            expect(otherLocaleFiles.sort()).toEqual(presetLocaleFiles.sort());
        }
    );
});

// const doc = yaml.load(
//     fs.readFileSync(
//         "src/content/beginner1/lesson2/4519_note_values/4519_note_values.yml",
//         "utf8"
//     )
// );
// console.log("#######", doc);
