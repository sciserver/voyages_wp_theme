<a data-value="<?php echo $data['is_featured'] == 'yes' ? 'true' : 'false'; ?>" data-pointer-title="<?php _e( 'Change &laquo;Featured&raquo; status', 'wproto' ); ?>" data-pointer-content="<?php _e( 'Click here to mark this post as featured or default.', 'wproto' ); ?>" href="javascript:;" data-post-id="<?php echo $data['post_id']; ?>" class="wproto_change_post_status wproto_change_featured">
	<img width="16" height="16" src="<?php echo WPROTO_THEME_URL; ?>/images/admin/<?php echo $data['is_featured'] == 'yes' ? 'true' : 'false'; ?><?php echo wpl_galaxy_wp_utils::is_retina() ? '@2x' : ''; ?>.png" alt="" />
</a>