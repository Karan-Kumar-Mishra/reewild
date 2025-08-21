type Ingredient = { name: string; carbon_kg: number };

export const estimateCarbon = (dish: string, ingredients: string[]) => {
  const result: Ingredient[] = ingredients.map((name) => ({
    name,
    carbon_kg: Math.random().toFixed(1) as unknown as number, 
  }));

  const total = result.reduce((sum, i) => sum + Number(i.carbon_kg), 0);

  return {
    dish,
    estimated_carbon_kg: total,
    ingredients: result,
  };
};
