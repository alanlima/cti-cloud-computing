

const reduceCourseCriterias = (criterias) => {
    return criterias.reduce((previous, current) => {
        return {
            ...previous,
            [current.id]: { text: current.name }
        }
    }, {});
}

const reduceCourseElements = (elements) => {
    return elements.reduce((previous, current) => {
        return {
            ...previous,
            [current.id]: {
                name: current.name,
                pc: reduceCourseCriterias(current.criterias)
            }
        }
    }, {});
}

export const unnormalizeCourseJson = (input) => {
    const output = {
        name: input.name,
        code: input.code,
        units: input.units.map(unit => {
            return {
                name: unit.name,
                code: unit.code,
                tags: unit.tags,
                EPC: reduceCourseElements(unit.elements)
            }
        })
    }
    console.log('check normalized course', { output });
    return output;
}