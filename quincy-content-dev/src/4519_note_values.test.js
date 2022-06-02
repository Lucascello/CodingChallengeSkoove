const mapFoldersAndFiles = require("./index");

describe("File loading test", () => {
    const filePath = JSON.stringify(
        mapFoldersAndFiles(`${__dirname}/content/beginner1/lesson2`)
    );

    test("Compare the flyer.scr and the yml file (4519_note_values.yml) on segment 1", () => {
        // console.log("**********", filePath);
        expect(filePath).toContain("D_D_1.svg");
    });

    test("Compare the expectation.scr and the yml file (4519_note_values.yml) on segment 1", () => {
        expect(filePath).toContain("D_D_1.csv");
    });

    test("Compare the startVoiceOver.src and the yml file (4519_note_values.yml) on segment 1", () => {
        expect(filePath).toContain("long_notes.aifc");
    });

    test("Compare the listenAudioCue.src and the yml file (4519_note_values.yml) on segment 1", () => {
        expect(filePath).toContain("D_D_2.aifc");
    });

    test("Compare the handvideo.src and the yml file(4519_note_values.yml) on segment 1", () => {
        expect(filePath).toContain("dd.mp4");
    });

    test("Compare the flyer.scr and the yml file (4519_note_values.yml) on segment 2", () => {
        expect(filePath).toContain("dd_1.svg");
    });

    test("Compare the expectation.scr and the yml file (4519_note_values.yml) on segment 2", () => {
        expect(filePath).toContain("dd_1.csv");
    });

    test("Compare the startVoiceOver.src and the yml file (4519_note_values.yml) on segment 2", () => {
        expect(filePath).toContain("short_notes.aifc");
    });

    test("Compare the listenAudioCue.src and the yml file (4519_note_values.yml) on segment 2", () => {
        expect(filePath).toContain("dd_1.aifc");
    });

    test("Compare the flyer.scr and the yml file (4519_note_values.yml) on segment 3", () => {
        expect(filePath).toContain("ddFddF_1.svg");
    });

    test("Compare the expectation.scr and the yml file (4519_note_values.yml) on segment 3", () => {
        expect(filePath).toContain("ddFddF_1.csv");
    });

    test("Compare the startVoiceOver.src and the yml file (4519_note_values.yml) on segment 3", () => {
        expect(filePath).toContain("reminder_note_duration.aifc");
    });

    test("Compare the listenAudioCue.src and the yml file (4519_note_values.yml) on segment 3", () => {
        expect(filePath).toContain("ddFddF_1.aifc");
    });
});
