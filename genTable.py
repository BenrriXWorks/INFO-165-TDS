import pandas as pd
import re

tokens = [
    "ANFANG", "ENDE", "WERT", "SYMBOLE", "ID", "ASSIGN", "INT", "FARBE", 
    "POS", "REC", "LIN", "UBE", "UNT", "ROJO", "AZUL", "AMARILLO", 
    "VERDE", "BLANCO", "EOF"
]
# Función para parsear el archivo grammar.output
def parse_bison_output(file_path):
    with open(file_path, 'r') as file:
        lines = file.readlines()

    states = []
    current_state = None
    for line in lines:
        state_match = re.match(r'^State (\d+)', line)
        if state_match:
            current_state = int(state_match.group(1))
        elif current_state is not None:
            action_match = re.match(r'^\s+(\S+)\s+(shift|reduce|go to state|accept|error),?\s*(.*)', line)
            if action_match:
                symbol = action_match.group(1)
                action = action_match.group(2)
                next_state = action_match.group(3)
                states.append((current_state, symbol, action, next_state))

    return states

# Parsear el archivo grammar.output
file_path = 'grammar.output'
states = parse_bison_output(file_path)

# Crear el DataFrame
df = pd.DataFrame(states, columns=['State', 'Symbol', 'Action', 'Next State'])

# Unir las columnas 'Action' y 'Next State' en una sola columna
df['Action'] = df['Action'] + ' ' + df['Next State']

# Eliminar la columna 'Next State' ya que ahora está incluida en 'Action'
df = df.drop(columns=['Next State'])

# Pivotar el DataFrame para obtener el formato Estado x Token
pivot_df = df.pivot(index='State', columns='Symbol', values='Action')

# Rellenar los valores NaN con una cadena vacía
pivot_df = pivot_df.fillna('')

pivot_df = pivot_df[tokens + [col for col in pivot_df.columns if col not in tokens]]
# Mostrar la tabla transformada
print(pivot_df)

# Guardar la tabla transformada en un archivo CSV (opcional)
pivot_df.to_excel('lalr_table_transformed.xlsx')    