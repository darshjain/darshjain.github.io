from flask import Flask,render_template,request,redirect
from flask_cors import CORS,cross_origin
import pickle
import pandas as pd
import numpy as np

app=Flask(__name__)
cors=CORS(app)
house_model=pickle.load(open('HouseLinearRegressionModelH.pkl', 'rb'))
house_csv = pd.read_csv('Mumbai1.csv')


@app.route('/')
def homepage():
    return render_template('homepage.html')


@app.route('/house')
def house():
    return render_template('house.html')

@app.route('/predict_house',methods=['POST'])
@cross_origin()
def predict_house():

    Area=request.form.get('Area')
    Location =request.form.get('Location')
    if (Location=='Kharghar'):
        Val1=0;
    elif(Location=='Thane West'):
        Val1=1;
    else:
        Val1=2;

    
    Bedrooms=request.form.get('Bedrooms')
    if(Bedrooms=="1"):
        Val2=1;
    elif(Bedrooms=="2"):
        Val2=2;
    else:
        Val2=3;
    NR=request.form.get('NR')
    if(NR=='N'):
        Val3=0;
    else:
        Val3=1;
# lin_reg_model.predict(pd.DataFrame([[681,2,1,0]],columns=['Area','Location','Bedrooms','New_Resale']))
    prediction=house_model.predict(pd.DataFrame([[Area,Val1,Val2,Val3]],columns=['Area','Location','Bedrroms','New_Resale']))
    
    print(prediction)

    return str(int(prediction[0]))



#CAR
model=pickle.load(open('CarLinearRegressionModel.pkl','rb'))
car=pd.read_csv('Cleaned_Car_data.csv')

@app.route('/car',methods=['GET','POST'])
def index():
    companies=sorted(car['company'].unique())
    car_models=sorted(car['name'].unique())
    year=sorted(car['year'].unique(),reverse=True)
    fuel_type=car['fuel_type'].unique()

    companies.insert(0,'Select Company')
    return render_template('car.html',companies=companies, car_models=car_models, years=year,fuel_types=fuel_type)


@app.route('/predict_car',methods=['POST'])
@cross_origin()
def predict():

    company=request.form.get('company')

    car_model=request.form.get('car_models')
    year=request.form.get('year')
    fuel_type=request.form.get('fuel_type')
    driven=request.form.get('kilo_driven')

    prediction=model.predict(pd.DataFrame(columns=['name', 'company', 'year', 'kms_driven', 'fuel_type'],
                              data=np.array([car_model,company,year,driven,fuel_type]).reshape(1, 5)))
    print(prediction)

    return str(np.round(prediction[0],2))


if __name__=='__main__':
    app.run(debug=True)