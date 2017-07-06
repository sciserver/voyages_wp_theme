<?php get_header(); global $wpl_galaxy_wp; ?>

	<!-- 
	
		CONTENT SECTION
		
	-->
	
	<div id="content" class="wrapper">
		<div class="grid">

			<section class="<?php wpl_galaxy_wp_front::content_classes(); ?>">
				
				<article class="post">
				
					<?php if( have_posts() ): while ( have_posts() ) : the_post(); $post_id = get_the_ID(); ?>
				
					<!--
					
						POST HEADER
						
					-->
				
					<?php wpl_galaxy_wp_front::post_header(); ?>
					
					<div class="ib post-date">
						
						<div class="ib day"><?php the_time('d'); ?></div>
						<div class="month"><?php the_time('F'); ?></div>
						<div class="year"><?php the_time('Y'); ?></div>
						
						<div class="comments-count"><a href="#comments"><i class="fa fa-comments-o"></i> <?php echo get_comments_number(); ?></a></div>
						
					</div>
					
					<!--
					
						POST CONTENT
						
					-->
					<div class="ib post-content">
					
						<!-- VIDEO -->
						<?php
							$video_content = get_post_meta( $post_id, 'player_code', true );
							$video_height = get_post_meta( $post_id, 'video_height', true );
							if( $video_content <> '' ):
						?>
						<iframe src="<?php echo $video_content; ?>" width="100%" height="<?php echo $video_height; ?>"></iframe>
						<?php endif; ?>
					
						<!-- POST CONTENT -->
						<div class="post-text">
							<?php the_content(); ?>
							
							<?php wp_link_pages('before=<div class="pagination post-paginate">&after=</div>&next_or_number=next'); ?>
							
							<?php if( !post_password_required() ): ?>
							<!--
						
								POST FOOTER
							
							-->
							<footer>
					
								<p>
									<span class="post-like"><?php wpl_galaxy_wp_front::likes( $post_id ); ?></span> 
									<span class="post-views"><?php wpl_galaxy_wp_front::views( $post_id ); ?></span>
								</p>  
					
								<?php
									$tags_list = get_the_term_list( $post_id, 'wproto_video_tag', '', ', ', '' );
									if( $tags_list <> '' ):
								?>
								<p>
									<strong><?php _e('Tags', 'wproto'); ?>:</strong>
									<?php echo $tags_list; ?> 
								</p>
								<?php endif; ?>
							
								<?php
									$cats_list = get_the_term_list( $post_id, 'wproto_video_category', '', ', ', '' );
									if( $cats_list <> '' ):
								?>
								<p>
									<strong><?php _e('Categories', 'wproto'); ?>:</strong>
									<?php echo $cats_list; ?>
								</p>
								<?php endif; ?>
							
								<?php wpl_galaxy_wp_front::share_post_code(); ?>
							
								<!--
							
									AUTHOR INFO BLOCK
								
								-->
								<?php wpl_galaxy_wp_front::post_author_info(); ?>
					
							</footer>
							<?php endif; ?>
							
						</div>
					</div>
					
					<!-- 
					
						RELATED POSTS BLOCK
						
					-->
					<?php wpl_galaxy_wp_front::related_posts( get_the_ID(), 8, 'wproto_video_category' ); ?>
					
					<!--
						
						COMMENTS
						
					-->
					<?php if( !post_password_required() ): ?>
						<?php comments_template( '', true ); ?>
					<?php endif; ?>
					
					<?php endwhile; endif; ?>
				
				</article>
				
			</section>

			<?php get_sidebar(); ?>
			
		</div>
	</div> <!-- /content -->

<?php get_footer();