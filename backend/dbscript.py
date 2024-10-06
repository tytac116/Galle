import psycopg2
import os
from datetime import datetime
import random
from urllib.parse import urlparse

# Get the DATABASE_URL from environment variables
DATABASE_URL = os.getenv('DATABASE_URL')

# Parse the DATABASE_URL
result = urlparse(DATABASE_URL)
db_name = result.path[1:]
username = result.username
password = result.password
host = result.hostname
port = result.port

# Connect to the database
conn = psycopg2.connect(
    dbname=db_name,
    user=username,
    password=password,
    host=host,
    port=port
)

cur = conn.cursor()

# Dummy data for subwardens
subwardens = ["Sub Warden A", "Sub Warden B", "Sub Warden C", "Sub Warden D"]

# Function to generate random data for visitors
def generate_dummy_data():
    for i in range(24):
        first_name = f"Visitor_{i}"
        last_name = f"LastName_{i}"
        student_number = None if random.choice([True, False]) else f"UCT{random.randint(1000, 9999)}"
        external_visitor = student_number is None
        phone_number = f"012345678{i}"
        email = f"visitor{i}@example.com"
        sign_in_time = datetime.now().strftime("%H:%M:%S")
        sign_in_date = datetime.now().strftime("%Y-%m-%d")
        visited_person = random.choice(subwardens)
        residence_name = "Leo Markwood Hall"

        cur.execute(f"""
            INSERT INTO visitor_sign_ins (first_name, last_name, student_number, external_visitor, phone_number, email, sign_in_time, sign_in_date, visited_person, residence_name)
            VALUES ('{first_name}', '{last_name}', {f"'{student_number}'" if student_number else 'NULL'}, {external_visitor}, '{phone_number}', '{email}', '{sign_in_time}', '{sign_in_date}', '{visited_person}', '{residence_name}');
        """)

# Generate dummy data
generate_dummy_data()

# Commit changes and close the connection
conn.commit()
cur.close()
conn.close()

print("Dummy data inserted successfully!")