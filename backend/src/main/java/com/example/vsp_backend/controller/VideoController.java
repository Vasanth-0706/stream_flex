package com.example.vsp_backend.controller;

import com.example.vsp_backend.model.Video;
import com.example.vsp_backend.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS, RequestMethod.DELETE })
@RestController
@RequestMapping("/api/videos")
public class VideoController {

    @Autowired
    private VideoRepository videoRepository;

    private final String uploadDir = System.getProperty("user.dir") + "/uploads/";

    @PostMapping("/upload")
    public ResponseEntity<?> uploadVideo(
            @RequestParam("title") String title,
            @RequestParam("uploader") String uploader,
            @RequestParam("video") MultipartFile videoFile,
            @RequestParam("thumbnail") MultipartFile thumbnailFile) throws IOException {
        File uploadDirectory = new File(uploadDir);
        if (!uploadDirectory.exists()) {
            uploadDirectory.mkdirs();
        }

        Video video = new Video();
        video.setTitle(title);
        video.setViews(0);
        video.setLikes(0);
        video.setUploader(uploader);
        video.setFilename("");
        video.setThumbnail("");
        video = videoRepository.save(video);

        String videoExtension = getFileExtension(videoFile.getOriginalFilename());
        String videoFileName = video.getId() + videoExtension;
        File videoDest = new File(uploadDir + videoFileName);
        videoFile.transferTo(videoDest);

        String thumbnailExtension = getFileExtension(thumbnailFile.getOriginalFilename());
        String thumbnailFileName = video.getId() + "_thumb" + thumbnailExtension;
        File thumbnailDest = new File(uploadDir + thumbnailFileName);
        thumbnailFile.transferTo(thumbnailDest);

        video.setFilename(videoFileName);
        video.setThumbnail(thumbnailFileName);
        videoRepository.save(video);

        return ResponseEntity.ok("Video uploaded successfully with ID: " + video.getId());
    }

    private String getFileExtension(String filename) {
        return (filename != null && filename.contains(".")) ? filename.substring(filename.lastIndexOf('.')) : "";
    }

    @GetMapping("/all")
    public List<Video> getAllVideos() {
        return videoRepository.findAll();
    }

    @GetMapping("/user/{uploader}")
    public List<Video> getUserVideos(@PathVariable String uploader) {
        return videoRepository.findByUploader(uploader);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVideo(@PathVariable String id) {
        Optional<Video> videoOpt = videoRepository.findById(id);
        if (videoOpt.isPresent()) {
            Video video = videoOpt.get();
            File videoFile = new File(uploadDir + video.getFilename());
            File thumbnailFile = new File(uploadDir + video.getThumbnail());
            boolean videoDeleted = videoFile.delete();
            boolean thumbnailDeleted = thumbnailFile.delete();
            videoRepository.deleteById(id);
            return ResponseEntity.ok("Video and thumbnail deleted: " + (videoDeleted && thumbnailDeleted));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Video not found");
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<?> likeVideo(@PathVariable String id) {
        Optional<Video> videoOpt = videoRepository.findById(id);
        if (videoOpt.isPresent()) {
            Video video = videoOpt.get();
            video.setLikes(video.getLikes() + 1);
            videoRepository.save(video);
            return ResponseEntity.ok("Liked");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Video not found");
    }

    @PostMapping("/{id}/view")
    public ResponseEntity<?> viewVideo(@PathVariable String id) {
        Optional<Video> videoOpt = videoRepository.findById(id);
        if (videoOpt.isPresent()) {
            Video video = videoOpt.get();
            video.setViews(video.getViews() + 1);
            videoRepository.save(video);
            return ResponseEntity.ok("View counted");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Video not found");
    }

    @RequestMapping(value = "/upload", method = RequestMethod.OPTIONS)
    public ResponseEntity<?> corsHeaders() {
        return ResponseEntity.ok().build();
    }

    @PostMapping("/test")
    public ResponseEntity<?> test() {
        return ResponseEntity.ok("Test OK");
    }
}
