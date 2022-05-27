const fs = require("fs");

function logSizes(directoryPath) {
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
                logSizes(`${directoryPath}/${content[i].name}`);
            }
        }
    });
}

//logSizes(`${__dirname}/content`);

function mapSizes(directoryPath) {
    const dirContent = fs.readdirSync(directoryPath, { withFileTypes: true });

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

const filePath = Object.assign(
    JSON.stringify(mapSizes(`${__dirname}/content`))
);

console.log("**********", filePath);

console.log(
    "###########",
    filePath.includes(
        '"short_long_notes_combined.aifc":150092,"short_notes.aifc":79304}'
    )
);

const prettyFilePath = Object.assign(
    JSON.stringify(mapSizes(`${__dirname}/content`), null, 2)
);

console.log("++++++++++", prettyFilePath);
