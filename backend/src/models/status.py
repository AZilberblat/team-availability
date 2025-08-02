from enum import Enum


class Status(str, Enum):
    WORKING = "Working"
    WORKING_REMOTELY = "Working Remotely"
    ON_VACATION = "On Vacation"
    BUSINESS_TRIP = "Business Trip"