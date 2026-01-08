import pandas as pd
import random
import os


def generate_data(row_num):
    data = []
    for _ in range(row_num):
        capacity = random.randint(50,1000)
        current_occupancy = random.randint(30,capacity)
        
        food_needed = int(current_occupancy * random.uniform(6, 11) + random.gauss(0, 10))
        water_required = int(current_occupancy * random.uniform(8, 14) + random.gauss(0, 5))
        
        kits_per_person = random.uniform(0.55,0.9)
        volunteers_per_person = random.uniform(0.25,0.6)
        
        medical_kits = int(current_occupancy * kits_per_person + random.gauss(0, 2))
        volunteers_required = int(current_occupancy * volunteers_per_person + random.gauss(0, 1))
        
        data.append({
            'capacity': capacity,
            'current_occupancy': current_occupancy,
            'occupancy_rate': current_occupancy / capacity,
            'empty_beds': capacity - current_occupancy,
            'is_full': int(current_occupancy == capacity),
            'food_needed': food_needed,
            'water_required': water_required,
            'kits_per_person': kits_per_person,
            'volunteers_per_person': volunteers_per_person,
            'medical_kits': medical_kits,
            'volunteers_required': volunteers_required
        })
    return pd.DataFrame(data)

shelter_df = generate_data(10000)

script_dir = os.path.dirname(os.path.abspath(__file__))

csv_path = os.path.join(script_dir,'Shelter_Resources.csv')

shelter_df.to_csv(csv_path,index = False)

print('CSV created and saved')