package com.example.vsp_backend.repository;

import com.example.vsp_backend.model.Video;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface VideoRepository extends MongoRepository<Video, String> {
    List<Video> findByUploader(String uploader);
}
