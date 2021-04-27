module.exports = class QueryParser {
    constructor(selector) {
        this.selector = selector;
        this.joinStatements = [];
        this.whereStatements = [];
        this.values = [];
    }

    databaseConditionals(databasesList) {
        databasesList.forEach( (database) => {
            let wasUsed = false;

            database.variables.forEach( (variable) => {
                if (typeof variable.value !== "undefined"){
                    wasUsed = true;
                    this.addConditional(variable.name, variable.value, !!variable.forgiving)
                }
            })
            if (wasUsed && database.joinStatement) {
                this.joinStatements.push(database.joinStatement);
            }
        })
    }

    addConditional(name, value, forgiving) {
        if (forgiving) {
            value = '%' + value + '%';
            this.values.push(value)
            this.whereStatements.push(`${name} ilike $${this.values.length}`)
        } else {
            this.values.push(value)
            this.whereStatements.push(`${name} = $${this.values.length}`)
        }
    }

    buildQuery() {
        let query = this.selector;
        this.joinStatements.forEach((joinStatement) => {
            query += " " + joinStatement;
        })

        if (this.whereStatements.length > 0){
            query += " where true";
        }
        this.whereStatements.forEach( (whereStatement) => {
            query += " and " + whereStatement;
        })

        return query;
    }

    buildParameters(){
        return this.values
    }
}