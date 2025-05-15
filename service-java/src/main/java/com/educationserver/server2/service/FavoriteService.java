package com.educationserver.server2.service;

import com.educationserver.server2.model.Favorite;
import com.educationserver.server2.repository.FavoriteRepository;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class FavoriteService {
    public final FavoriteRepository favoriteRepository;

    public FavoriteService(FavoriteRepository favoriteRepository) {
        this.favoriteRepository = favoriteRepository;
    }

    @Cacheable("favorites")
    public List<Favorite> getFavorites() {
        return favoriteRepository.findAll();
    }

    @CacheEvict(value = {"favorites","favoritesByUser","favoriteCheck"}, allEntries = true)
    public void addFavorite(Favorite favorite) {
        favoriteRepository.save(favorite);
    }

    @CacheEvict(value = {"favorites","favoritesByUser","favoriteCheck"}, allEntries = true)
    public void deleteFavoriteById(String id) {
        favoriteRepository.deleteById(id);
    }

    @Cacheable(value = "favoriteCheck", key = "#userId+'-'+#courseId")
    public boolean existsByUserIdAndCourseId(int userId, int courseId) {
        return favoriteRepository.existsByUserIdAndCourseId(userId, courseId);
    }

    @Cacheable(value = "favoritesByUser", key = "#userId")
    public List<Favorite> getFavoritesByUserId(int userId) {
        return favoriteRepository.getFavoritesByUserId(userId);
    }
}
