import psycopg2

# FILTER_QUERIES is a shortcut "map" so we dont have to type everything out if we add new filters
FILTER_QUERIES = {
    "office": "'{}' = ANY(office)",
    "sensitivity": "'{}' = ANY(sensitivity)",
    "request_process": "req_proc = '{}'",
    "request_form": "req_form = '{}'",
    "frequency": "'{}' = ANY(freeq)",
}

SEARCH_QUERIES = {
    "data_source": "LOWER(data_source) LIKE LOWER('%{}%')",
    "poc": "EXISTS (SELECT * FROM unnest(datainv.poc) name WHERE LOWER(name) LIKE LOWER('%{}%'))"
}


class SearchFilter:
    def __init__(self):
        self.filters = {
            "filters": {
                "office": ["All"],
                "sensitivity": "All", 
                "request_process": "All",
                "request_form": "All",
                "frequency": "All"
        }}
        self.search_string = ""

        self.connection = psycopg2.connect(database="data_foundry",
                                           user="data_foundry_user",
                                           password="***REMOVED***",
                                           host="codeplus-postgres-test-01.oit.duke.edu",
                                           port="5432")

        self.cur = self.connection.cursor()

    def create_filter_conditions(self):
        filter_query = []
        for field in FILTER_QUERIES:
            if field == "office":
                office_conditions = [FILTER_QUERIES[field].format(office) if office != "All"
                                     else "1 = 1" for office in getattr(self.filters, field)]
                filter_query.append(f"({' OR '.join(office_conditions)})")
            elif getattr(self.filters, field) != "All":
                filter_query.append(FILTER_QUERIES[field].format(getattr(self.filters, field)))
            else:
                filter_query.append("1 = 1")
        return " AND ".join(filter_query)

    def create_search_conditions(self):
        if self.search_string == "":
            return "1 = 1"
        
        search_query = []
        for field in SEARCH_QUERIES:
            search_query.append(SEARCH_QUERIES[field].format(self.search_string))
        return f"({' OR '.join(search_query)})"
    
    def query(self):
        query = f"SELECT data_source, platform, office, poc, app_auth, sensitivity, \
              req_proc, req_form, app_req, provided, freeq, notes, description, icon FROM datainv \
              WHERE {self.create_filter_conditions()} AND {self.create_search_conditions()}"

        print(query)

        self.cur.execute(query)
        rows = self.cur.fetchall()

        return [{
            "data_source": row[0],
            "platform": row[1],
            "office": row[2].replace("{", "").replace("}", ""),
            "poc": str(row[3]).replace("[", "").replace("]", "").replace("'", ""),
            "app_auth": row[4].replace("{", "").replace("}", ""),
            "sensitivity": row[5].replace("{", "").replace("}", ""),
            "req_form": row[6],
            "req_proc": row[7],
            "app_req": row[8],
            "provided": row[9].replace("{", "").replace("}", ""),
            "freeq": row[10].replace("{", "").replace("}", ""),
            "notes": row[11],
            "description": row[12],
            "icon": row[13]
        } for row in rows]

    def update_filters(self, filters):
        self.filters = filters

    def update_search_string(self, search_string):
        self.search_string = search_string.strip(" ")
