import speaker from "../../../main/api/speaker";

test('speaker integration test', () => {

    describe('getSpeaker', () => {

        it('should get a speaker using a valid id', () => {
            return speaker.getSpeaker("695b40d928dd0a905b7ab1b900b5a5752870a7d8").then((result) => {
                expect(result.firstName).toEqual("Agnes");
                expect(result.lastName).toEqual("Crepet");
                expect(result.company).toEqual("Ninja Squad");
            }).catch((error) => {
                expect(true).toBe(false);
            });
        });

        it('should not get a speaker with an invalid id', () => {
            return speaker.getSpeaker("abcdef123456").then((result) => {
                expect(true).toEqual(false);
            }).catch((error) => {
                expect(error.name).toEqual('Error');
            });
        });

        it('should not get a speaker with no id', () => {
            return speaker.getSpeaker("").then((result) => {
                expect(true).toEqual(false);
            }).catch((error) => {
                expect(error.name).toEqual('Error');
            });
        });
    });

});