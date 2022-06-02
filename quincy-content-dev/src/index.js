const fs = require("fs");

function mapFoldersAndFiles(directoryPath) {
    const dirContent = fs.readdirSync(directoryPath, {
        withFileTypes: true,
    });

    const objFromMap = {};

    dirContent.forEach((item) => {
        const path = directoryPath + "/" + item.name;
        if (item.isFile()) {
            const metaData = fs.statSync(path);

            objFromMap[item.name] = metaData.size;
        } else {
            let nextObj = mapFoldersAndFiles(path);
            objFromMap[item.name] = nextObj;
        }
    });
    return objFromMap;
}

module.exports = mapFoldersAndFiles;
