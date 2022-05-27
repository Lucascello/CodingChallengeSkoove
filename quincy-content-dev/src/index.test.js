const fs = require("fs");

describe("File loading test", () => {
    function checkFiles(directoryPath) {
        fs.readdir(directoryPath, { withFileTypes: true }, (err, content) => {
            if (err) {
                console.log(err);
                return;
            }

            for (let i = 0; i < content.length; i++) {
                if (content[i].isFile()) {
                    fs.stat(
                        `${directoryPath}/${content[i].name}`,
                        "utf8",
                        (err, metaData) => {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            // console.log(`${metaData.size}`);
                            console.log(`${directoryPath}/${content[i].name}`);
                        }
                    );
                } else {
                    checkFiles(`${directoryPath}/${content[i].name}`);
                }
            }
        });
    }

    //checkFiles(`${__dirname}/content`);

    function mapSizes(directoryPath) {
        const dirContent = fs.readdirSync(directoryPath, {
            withFileTypes: true,
        });

        const objFromMap = {};

        dirContent.forEach(function (item) {
            const path = directoryPath + "/" + item.name;
            if (item.isFile()) {
                const metaData = fs.statSync(path);

                objFromMap[item.name] = metaData.size;
            } else {
                let nextObj = mapSizes(path);
                objFromMap[item.name] = nextObj;
            }
        });
        return objFromMap;
    }

    // console.log(JSON.stringify(mapSizes(`${__dirname}/content`), null, 2));

    test("Compare the flyer.scr and the yml file (4519_note_values.yml)", () => {
        const filePath = JSON.stringify(mapSizes(`${__dirname}/content`));

        console.log("**********", filePath);
        expect(filePath).toContain(
            '"img":{"dd_1.svg":17276,"de":{"DDffDDff.svg":27270,"D_D_1.svg":12409}'
        );
    });

    test("Compare the expectation.scr and the yml file (4519_note_values.yml)", () => {
        const filePath = JSON.stringify(mapSizes(`${__dirname}/content`));

        expect(filePath).toContain(
            '"expect":{"DDffDDff.csv":126,"ddFddF_1.csv":100,"dd_1.csv":74, "D_D_1.csv"}'
        );
    });

    test("Compare the startVoiceOver.src and the yml file (4519_note_values.yml)", () => {
        const filePath = JSON.stringify(mapSizes(`${__dirname}/content`));

        expect(filePath).toContain(
            '"voice":{"de":{"long_notes.aifc":127108,"short_long_notes_combined.aifc":150092,"short_notes.aifc":79304}'
        );
    });

    test("Compare the listenAudioCue.src and the yml file (4519_note_values.yml)", () => {
        const filePath = JSON.stringify(mapSizes(`${__dirname}/content`));

        expect(filePath).toContain(
            '"audio":{"D_D_2.aifc":160292,"ddFddF_1.aifc":160292,"dd_1.aifc":160292}'
        );
    });

    test("Compare the handvideo.src and the yml file(4519_note_values.yml)", () => {
        const filePath = JSON.stringify(mapSizes(`${__dirname}/content`));

        expect(filePath).toContain(
            '"lesson2":{"4519_note_values":{"4519_note_values.yml":1682,"audio":{"D_D_1.aifc":160292,"ddFddF_1.aifc":160292,"dd_1.aifc":160292},"expect":{"DDffDDff.csv":126,"ddFddF_1.csv":100,"dd_1.csv":74},"img":{"dd_1.svg":17276,"de":{"DDffDDff.svg":27270,"D_D_1.svg":12409},"en":{"DDffDDff.svg":27270,"D_D_1.svg":12409}},"index.yml":45,"video":{"dd.mp4"'
        );
    });
});
