TABLES = {}

TABLES["link"] = (
    "CREATE TABLE `link` ("
    "  `link_id` int NOT NULL AUTO_INCREMENT,"
    "  `short_url` text NOT NULL,"
    "  `reference_url` text NOT NULL,"
    "  `is_custom` tinyint NOT NULL,"
    "  `available_refs` int NOT NULL,"
    "  `date_created` date NOT NULL,"
    "  `is_private` tinyint NOT NULL,"
    "  PRIMARY KEY (`link_id`)"
    ") ENGINE=InnoDB")


TABLES["statistics"] = (
    "CREATE TABLE `statistics` ("
    "  `track_id` int NOT NULL AUTO_INCREMENT,"
    "  `track_date` date NOT NULL,"
    "  `f_link_id` int NOT NULL,"
    "  PRIMARY KEY (`track_id`),"
    "  FOREIGN KEY (`f_link_id`) REFERENCES `link`(`link_id`)"
    ") ENGINE=InnoDB")

METHODS = {}

METHODS["2"] = {"lower": 65,
"upper": 90}

METHODS["3"] = {"lower": 97,
"upper": 122}

METHODS["4"] = {"lower": 48,
"upper": 57}
