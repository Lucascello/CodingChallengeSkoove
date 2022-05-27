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
        const filePath = JSON.stringify(
            mapSizes(`${__dirname}/content/beginner1/lesson2`)
        );

        console.log("**********", filePath);
        expect(filePath).toContain("D_D_1.svg");
    });

    test("Compare the expectation.scr and the yml file (4519_note_values.yml)", () => {
        const filePath = JSON.stringify(
            mapSizes(`${__dirname}/content/beginner1/lesson2`)
        );

        expect(filePath).toContain("D_D_1.csv");
    });

    test("Compare the startVoiceOver.src and the yml file (4519_note_values.yml)", () => {
        const filePath = JSON.stringify(
            mapSizes(`${__dirname}/content/beginner1/lesson2`)
        );

        expect(filePath).toContain("long_notes.aifc");
    });

    test("Compare the listenAudioCue.src and the yml file (4519_note_values.yml)", () => {
        const filePath = JSON.stringify(
            mapSizes(`${__dirname}/content/beginner1/lesson2`)
        );

        expect(filePath).toContain("D_D_2.aifc");
    });

    test("Compare the handvideo.src and the yml file(4519_note_values.yml)", () => {
        const filePath = JSON.stringify(
            mapSizes(`${__dirname}/content/beginner1/lesson2`)
        );

        expect(filePath).toContain("dd.mp4");
    });
});
