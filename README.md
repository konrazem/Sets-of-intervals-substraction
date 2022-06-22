


# Sets of intervals substraction
Method to get new list of free intervals from given lists of:
- A: free intervals 
- B: taken/occupied intervals 

New intervals is a set substraction of A / B that do not contain points that belongs to intervals in list B. 


```log
-------- TAKEN INTERVALS -----------
┌─────────┬───────┬─────┐
│ (index) │ start │ end │
├─────────┼───────┼─────┤
│    0    │  10   │ 12  │
│    1    │  15   │ 16  │
└─────────┴───────┴─────┘
-------- FREE INTERVALS -----------
┌─────────┬───────┬─────┐
│ (index) │ start │ end │
├─────────┼───────┼─────┤
│    0    │   8   │  9  │
│    1    │  11   │ 12  │
│    2    │  15   │ 17  │
└─────────┴───────┴─────┘
-------- NEW FREE INTERVALS -----------
┌─────────┬───────┬─────┐
│ (index) │ start │ end │
├─────────┼───────┼─────┤
│    0    │   8   │  9  │
│    1    │  16   │ 17  │
└─────────┴───────┴─────┘
--------- TEST 1 ----------
true
```

## MOTIVATION
*I cloudn't find efficient algorithm for getting substraction of sets of intervals.*

Instead of looping and working on dynamic lists, project all intervals points on one timeline, sort and go point by point and set flags in order to collect free intervals.