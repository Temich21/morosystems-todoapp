import { readableTimeConverter } from '../timeReadable'

describe('readableTimeConverter', () => {
    it('should format time correctly', () => {
        const inputTime = '2023-10-16T16:36:00'
        const expectedOutput = '16.10.2023 16:36'

        const formattedTime = readableTimeConverter(inputTime);

        expect(formattedTime).toEqual(expectedOutput)
    })

    it('should add a leading zero to single-digit minutes', () => {
        const inputTime = '2023-10-16T16:09:00'
        const expectedOutput = '16.10.2023 16:09'

        const formattedTime = readableTimeConverter(inputTime);

        expect(formattedTime).toEqual(expectedOutput);
    })
});