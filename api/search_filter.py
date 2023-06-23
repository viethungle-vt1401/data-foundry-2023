import psycopg2

# FIELDS_QUERIES is a shortcut "map" so we dont have to type everything out if we add new filters
FIELDS_QUERIES = {
    "office": "'{}' = ANY(office)",
    "sensitivity": "'{}' = ANY(sensitivity)",
    "request_process": "req_proc = '{}'",
    "request_form": "req_form = '{}'",
    "frequency": "'{}' = ANY(freeq)",
    "data_source": "data_source LIKE '%{}%'",
    "poc": "EXISTS (SELECT * FROM unnest(datainv.poc) name WHERE name LIKE '%{}%') "
}


class SearchFilter:
    def __init__(self):
        self.filters = {}
        self.search_string = ""

        self.connection = psycopg2.connect(database="data_foundry",
                                           user="data_foundry_user",
                                           password="***REMOVED***",
                                           host="codeplus-postgres-test-01.oit.duke.edu",
                                           port="5432")

        self.cur = self.connection.cursor()

    def create_query_conditions(self):
        query = []
        for field in FIELDS_QUERIES:
            if field == "office":
                office_conditions = [FIELDS_QUERIES[field].format(office) if office != "All"
                                     else "1 = 1" for office in getattr(self.filters, field)]
                query.append(f"({' OR '.join(office_conditions)})")
            elif getattr(self.filters, field) != "All":
                query.append(FIELDS_QUERIES[field].format(getattr(self.filters, field)))
            else:
                query.append("1 = 1")
        return " AND ".join(query)

    def query(self):
        query = f"SELECT data_source, platform, office, poc, app_auth, sensitivity, \
              req_proc, req_form, app_req, provided, freeq, notes, description, icon FROM datainv \
              WHERE {self.create_query_conditions()}"

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

    def update_filters(self, filter):
        self.filter = filter

    def update_search_string(self, search_string):
        self.search_string = search_string
