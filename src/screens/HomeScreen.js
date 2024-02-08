import { View, Text, ScrollView, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import Categories from '../components/categories';
import axios from 'axios';
import Recipes from '../components/recipes';

export default function HomeScreen() {

  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);

  useEffect(()=>{
    getCategories();
    getRecipes();
  },[])

  const handleChangeCategory = category=>{
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  }

  const getCategories = async ()=>{
    try{
      const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
      // console.log('got categories: ',response.data);
      if(response && response.data){
        setCategories(response.data.categories);
      }
    }catch(err){
      console.log('error: ',err.message);
    }
  }
  const getRecipes = async (category="Beef")=>{
    try{
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      // console.log('got recipes: ',response.data);
      if(response && response.data){
        setMeals(response.data.meals);
      }
    }catch(err){
      console.log('error: ',err.message);
    }
  }
  return (
    <View className="flex-1 bg-orange-200">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}
        className="space-y-6 pt-14"
      >

        {/* greetings and punchline */}
        <View className="mx-4 space-y-2 mb-2">
          <View>
            <Text style={{fontSize: hp(3.8)}} className="font-semibold text-neutral-800">Hello Foodie!</Text>
          </View>
        </View>

        {/* search bar */}
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder='Search any recipe'
            placeholderTextColor={'gray'}
            style={{fontSize: hp(1.7)}}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
          />
          <View className="bg-gray-800 rounded-full p-3">
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
          </View>
        </View>

        {/* categories */}
        <View>
          { categories.length>0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} /> }
        </View>

        {/* recipes */}
        <View>
          <Recipes meals={meals} categories={categories} />
        </View>
      </ScrollView>
    </View>
  )
}