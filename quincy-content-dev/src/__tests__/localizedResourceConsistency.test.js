const fs = require("fs");
const glob = require("fast-glob");
const path = require("path");
const yaml = require("js-yaml");

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

describe("File loading test", () => {
    getLessonDirectories(
        `${__dirname}/../content/beginner1`,
        (lessonDirectoryName) => {
            const doc = yaml.load(fs.readFileSync(lessonDirectoryName, "utf8"));
            console.log("********", doc);
        }
    );
});

function getLessonDirectories(directoryPath, callback) {
    fs.readdir(directoryPath, { withFileTypes: true }, (err, content) => {
        if (err) {
            console.log(err);
            return;
        }

        for (let i = 0; i < content.length; i++) {
            if (directoryPath.indexOf("lesson") == -1) {
                getLessonDirectories(`${directoryPath}/${content[i].name}`);
            } else {
                callback(`${directoryPath}/${content[i]}`);
            }
        }
    });
}
