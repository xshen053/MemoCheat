from datetime import timedelta

def calculate_review_dates(created_date):
    plan = [0, 1, 2, 4, 7, 14, 21, 30, 45, 60, 90, 120, 150]  # example intervals
    return [created_date + timedelta(days=interval) for interval in plan]
