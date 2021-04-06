"""
Settings can be made here
"""

DB_NAME = 'pvsSURL'
DB_PASSWORD = ''

DB_HOST = 'mariadb' # static - don't change (when using docker)
DB_USER = 'root'    # static - don't change (when using docker)
DB_PORT = 3306      # static - don't change (when using docker)

DOMAIN = 'http://localhost:5000' 
# Domain kann angepasst werden. Das ist das Prefix für die verkürzte URL.
# Zum Testen: http://localhost:5000 angeben.

SHORT_LENGTH = 4    # Länge der verkürzten URL (wenn zufällig generiert)
DEFAULT_RANDOMIZER = 1  # Auswahl des Standardrandomisierers (1 = Default [Groß, Klein, Zahlen], 2= Großbuchstaben, 3 = Kleinbuchstaben, 4 = Zahlen)
