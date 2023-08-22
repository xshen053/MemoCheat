from datetime import timedelta

def calculate_review_dates(created_date):
    plan = [1, 3, 7, 14, 29]  # example intervals
    return [created_date + timedelta(days=interval) for interval in plan]
