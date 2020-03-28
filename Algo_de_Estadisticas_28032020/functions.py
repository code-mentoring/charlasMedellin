import pandas as pd

datos = pd.read_csv('creditos.csv', sep=',')

datos.describe()
