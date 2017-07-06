<?php
	global $wp_query, $wpl_galaxy_wp, $wpl_galaxy_wp_ajax_pagination;
?>
<!--

	ONE COLUMN GRID LAYOUT
	
-->
<?php if( !is_search() && !isset( $wpl_galaxy_wp_ajax_pagination ) ): ?>
<div class="posts" id="ajax-pagination-response-container">
<?php endif; ?>

	<?php while ( $wp_query->have_posts() ) : $wp_query->the_post(); ?>
	
	<?php
		$post_format = get_post_format();
		$post_format = $post_format === false ? 'standard' : $post_format;
		
		$post_type = get_post_type();
	?>
	
	<article <?php post_class(); ?> data-appear-animation="fadeIn">
		
		<?php if( $post_format == 'gallery' || in_array( $post_type, array( 'wproto_photoalbums', 'wproto_portfolio' ) ) ): ?>
			<!--
			
			=======================================================================================================================
			GALLERY / PORTFOLIO / PHOTOALBUMS THUMBNAILS
			=======================================================================================================================
			
			-->
			<?php
			
			$gallery_ids = get_post_meta( get_the_ID(), 'wproto_attached_images', true );
			
			if( $gallery_ids == '' && get_post_gallery() ) {
				$gallery = get_post_gallery( get_the_ID(), false );
				$gallery_ids = isset( $gallery['ids'] ) ? $gallery['ids'] : '';
			}
			
			if( is_string( $gallery_ids ) && $gallery_ids <> '' ) {
				$gallery_ids = explode( ',', $gallery_ids );
			}
			
			if( is_array( $gallery_ids ) && count( $gallery_ids ) > 0 ):
			?>
			<div class="item-slider">
				<div class="post-slider">	
					<div class="post-slider-carousel">
						<?php foreach( $gallery_ids as $id ): ?>
							<?php
								$image_thumb = wpl_galaxy_wp_utils::is_retina() ? 'post-thumb-medium-2x' : 'post-thumb-medium';
								$image = wp_get_attachment_image_src( $id, $image_thumb );
							?>
							<img src="<?php echo $image[0]; ?>" alt="" />
						<?php endforeach; ?>
					</div>
					<span class="post-slider-prev"><a href="javascript:;"></a></span>
					<span class="post-slider-next"><a href="javascript:;"></a></span>
					<div class="clear"></div>
				</div>
			</div>
			<?php elseif( has_post_thumbnail() ): ?>
				<div class="thumbnail one-col-grid-thumb">
					<?php wpl_galaxy_wp_front::thumbnail( get_the_ID(), 'post-thumb-medium' ); ?>
					<a href="<?php the_permalink(); ?>" class="thumb-hover"><span class="details"><?php _e('Read in details', 'wproto'); ?> <i class="menu-angle"></i></span></a>
					<div class="clear"></div>
				</div>
			<?php endif; ?>
		
		<?php elseif( $post_type == 'wproto_video' ): ?>
			<!--
			
			=======================================================================================================================
			VIDEOS THUMBNAILS
			=======================================================================================================================
			
			-->
			
			<!-- VIDEO -->
			<?php
				$video_thumb = get_post_meta( get_the_ID(), 'thumbnail_big', true );
				if( $video_thumb <> '' ):
			?>
				<div class="thumbnail one-col-grid-thumb">
					<a href="<?php the_permalink(); ?>"><img src="<?php echo $video_thumb; ?>" alt="" /></a>
					<a href="<?php the_permalink(); ?>" class="thumb-hover"><span class="details"><?php _e('View video', 'wproto'); ?> <i class="menu-angle"></i></span></a>
					<div class="clear"></div>
				</div>
			<?php endif; ?>
			
		<?php else: ?>
			<!--
			
			=======================================================================================================================
			OTHER / COMMON POST THUMBNAILS
			=======================================================================================================================
			
			-->
				
		<?php if( has_post_thumbnail() ): ?>
			<div class="thumbnail one-col-grid-thumb">
				<?php wpl_galaxy_wp_front::thumbnail( get_the_ID(), 'post-thumb-medium' ); ?>
				<a href="<?php the_permalink(); ?>" class="thumb-hover"><span class="details"><?php _e('Read in details', 'wproto'); ?> <i class="menu-angle"></i></span></a>
				<div class="clear"></div>
			</div>
			<?php endif; ?>
				
		<?php endif; ?>

			<!--
			
			=======================================================================================================================
			POST HEADER
			=======================================================================================================================
			
			-->
	
		<header>
			<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
			<div class="data">
				<?php if( !in_array( $post_type, array('product', 'wproto_catalog') ) ): ?>
				<span class="date"><?php the_time( $wpl_galaxy_wp->settings['date_format'] ); ?></span> <a href="<?php comments_link(); ?>" class="comments"><i class="fa fa-comments-o"></i> <?php echo get_comments_number(); ?></a>
				<?php endif; ?>
				
				<?php if( in_array( $post_type, array('product', 'wproto_catalog') ) ): ?>
				<div class="price">
					<?php if( $post_type == 'product' ): ?>
				
						<?php
							$product = get_product( get_the_ID() );
							echo $product->get_price_html();
						?>
				
					<?php endif; ?>
				
					<?php if( $post_type == 'wproto_catalog' ): ?>
				
						<?php
							$old_price = get_post_meta( get_the_ID(), 'old_price', true );
							$old_price = $old_price <> '' ? wpl_galaxy_wp_front::get_price( $old_price ) : '';
											
							$price = get_post_meta( get_the_ID(), 'price', true );
							$price = $price <> '' ? wpl_galaxy_wp_front::get_price( $price ) : '';
						?>
					
						<?php if( $old_price <> '' ): ?>
						<del class="old-price"><?php echo $old_price; ?></del>
						<?php endif; ?>
						<?php echo $price; ?>
				
					<?php endif; ?>
				
				</div>
				<?php endif; ?>
				
				<?php if( $post_type == 'wproto_catalog' && ( absint( get_post_meta( get_the_ID(), 'wproto_likes', true ) ) >= $wpl_galaxy_wp->get_option('five_star_likes_count') ) ): ?>
				
					<?php
						echo wpl_galaxy_wp_front::get_rating_html( 5 );
					?>
				
				<?php endif; ?>
				
			</div>		
		</header>

			<!--
			
			=======================================================================================================================
			EXCERPT
			=======================================================================================================================
			
			-->

		<div class="text">
			
			<?php if( in_array( $post_format, array('aside', 'quote') ) ): ?>
			
				<?php the_content(); ?>
			
			<?php else: ?>
		
				<?php the_excerpt(); ?>
				
			<?php endif; ?>
		</div>

			<!--
			
			=======================================================================================================================
			POST FOOTER
			=======================================================================================================================
			
			-->

		<footer>
			<div class="tags">
			
				<?php if( !in_array( $post_type, array('product', 'wproto_catalog') ) ): ?>
				<strong><?php _e('By', 'wproto'); ?></strong> <?php the_author_posts_link(); ?>
				<?php endif; ?>
					
				<?php
					$cats_list = wpl_galaxy_wp_front::get_categories();
					if( $cats_list <> '' ):
				?>
				<strong class="in"><?php _e('In', 'wproto'); ?></strong> <?php echo $cats_list; ?>
				<?php
					endif; 
				?>
			</div>
							
			<a href="<?php the_permalink(); ?>" class="continue-reading"><?php _e('Keep reading', 'wproto'); ?> <i class="arrow-keep-reading"></i></a>
							
		</footer>
						
	</article>
	
	<?php endwhile; ?>
	
<?php if( !is_search() && !isset( $wpl_galaxy_wp_ajax_pagination ) ): ?>
</div>
<?php endif;