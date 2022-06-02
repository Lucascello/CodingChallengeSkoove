const mapFoldersAndFiles = require("./index");

describe("File existing test 4516_long_short_notes", () => {
    console.log(
        "++++++++",
        JSON.stringify(mapFoldersAndFiles(`${__dirname}/content`), null, 2)
    );

    const filePath = JSON.stringify(
        mapFoldersAndFiles(`${__dirname}/content/beginner1/lesson1`)
    );

    const filePathSharedFolder = JSON.stringify(
        mapFoldersAndFiles(`${__dirname}/content`)
    );

    test("Compare the flyer.scr and the yml file (4516_note_values.yml) on segment 1", () => {
        // console.log("**********", filePath);
        expect(filePath).toContain("D_D_1.svg");
    });

    test("Compare the expectation.scr and the yml file (4516_note_values.yml) on segment 1", () => {
        expect(filePath).toContain("D_D_1.csv");
    });

    test("Compare the startVoiceOver.src and the yml file (4516_note_values.yml) on segment 1", () => {
        expect(filePath).toContain("long_notes.aifc");
    });

    test("Compare the listenAudioCue.src and the yml file (4516_note_values.yml) on segment 1", () => {
        expect(filePath).toContain("D_D_1.aifc");
    });

    test("Compare the handvideo.src and the yml file(4516_note_values.yml) on segment 1", () => {
        expect(filePath).toContain("dd.mp4");
    });

    test("Compare the flyer.scr and the yml file (4516_note_values.yml) on segment 2", () => {
        expect(filePathSharedFolder).toContain("dynamic_marks.svg");
    });

    test("Compare the expectation.scr and the yml file (4516_note_values.yml) on segment 2", () => {
        expect(filePath).toContain("dd_1.csv");
    });

    test("Compare the startVoiceOver.src and the yml file (4516_note_values.yml) on segment 2", () => {
        expect(filePath).toContain("short_notes.aifc");
    });

    test("Compare the listenAudioCue.src and the yml file (4516_note_values.yml) on segment 2", () => {
        expect(filePath).toContain("dd_1.aifc");
    });

    test("Compare the flyer.scr and the yml file (4516_note_values.yml) on segment 3", () => {
        expect(filePath).toContain("ddFddF_1.svg");
    });

    test("Compare the expectation.scr and the yml file (4516_note_values.yml) on segment 3", () => {
        expect(filePath).toContain("ddFddF_1.csv");
    });

    test("Compare the startVoiceOver.src and the yml file (4516_note_values.yml) on segment 3", () => {
        expect(filePath).toContain("short_long_notes_combined.aifc");
    });

    test("Compare the listenAudioCue.src and the yml file (4516_note_values.yml) on segment 3", () => {
        expect(filePath).toContain("ddFddF_1.aifc");
    });

    test("Compare the flyer.scr and the yml file (4516_note_values.yml) on segment 4", () => {
        expect(filePath).toContain("DDffDDff.svg");
    });

    test("Compare the expectation.scr and the yml file (4516_note_values.yml) on segment 4", () => {
        expect(filePath).toContain("DDffDDff.csv");
    });

    test("Compare the startVoiceOver.src and the yml file (4516_note_values.yml) on segment 4", () => {
        expect(filePathSharedFolder).toContain("reminder_note_duration.aifc");
    });
});
