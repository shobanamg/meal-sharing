export const findAvailableSpots = (mealsWithAvailableSpots, selectedMeal) => {
    const reservationInfo = mealsWithAvailableSpots
        .find((meal) => {
            return meal.id === Number(selectedMeal.id);
        });
    return reservationInfo ? reservationInfo.max_reservations - reservationInfo.reserved_so_far : selectedMeal.max_reservations;
}