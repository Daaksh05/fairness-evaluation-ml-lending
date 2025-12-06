import csv

def create_csv_from_user_input():
    print("\n🔹 Enter CSV rows (comma-separated values).")
    print("🔹 Type 'done' when finished.\n")

    # Ask for header
    header = input("Enter column names (comma-separated): ").split(",")

    rows = []
    print("\nStart entering rows:")

    while True:
        row = input("> ")
        if row.lower() == "done":
            break
        rows.append(row.split(","))

    # Save to CSV file
    file_path = "data/raw/lending_data.csv"
    
    with open(file_path, "w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
        writer.writerow(header)
        writer.writerows(rows)

    print(f"\n✅ CSV created successfully at: {file_path}")

if __name__ == "__main__":
    create_csv_from_user_input()

