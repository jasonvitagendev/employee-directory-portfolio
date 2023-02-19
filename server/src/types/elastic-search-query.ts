export interface EmployeesByFullName {
    hits: {
        hits: {
            _source: {
                full_name: string;
                id: string;
            };
            highlight: {
                full_name: string[];
            };
        }[];
    };
}
