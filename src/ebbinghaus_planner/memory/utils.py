from datetime import timedelta

def calculate_review_dates(created_date):
    plan = [0, 1, 2, 4, 7, 14, 21, 30, 45, 60, 90, 120, 150]  # example intervals
    return [created_date + timedelta(days=interval) for interval in plan]

def create_daily_dates(start_date, months=6):
    end_date = start_date + timedelta(days=30*months)  # Approximating 1 month as 30 days
    current_date = start_date
    dates = []

    while current_date <= end_date:
        dates.append(current_date)
        current_date += timedelta(days=1)
    
    return dates
